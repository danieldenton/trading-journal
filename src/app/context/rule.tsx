"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

import { Rule } from "../lib/types";
import {
  createRule,
  getRules,
  updateRule,
  deleteRule,
} from "../lib/actions/rule-actions";
import { useUserContext } from "./user";
import { QueryResultRow } from "@vercel/postgres";

type RuleContext = {
  rules: Rule[];
  setRules: Dispatch<SetStateAction<Rule[]>>;
  newRuleName: string;
  setNewRuleName: Dispatch<SetStateAction<string>>;
  addNewRule: (prevState: any, formData: FormData) => void;
  deleteRuleFromDb: (RuleId: number) => void;
  patchAndSaveUpdatedRuleToRules: (updatedRule: Rule) => void;
};

export const RuleContext = createContext<RuleContext | undefined>(undefined);

export default function RuleContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [rules, setRules] = useState<Rule[]>([]);
  const [newRuleName, setNewRuleName] = useState("");
  const { user } = useUserContext();

  const formatRuleReturn = (rule: QueryResultRow): Rule => {
    return {
      id: rule.id,
      rule: rule.rule,
    };
  };

  const fetchRules = async () => {
    try {
      if (!user?.id) return;
        const userRules = await getRules(user.id);
        if (!userRules) return;
        const formattedRules = userRules.map((rule) =>
          formatRuleReturn(rule)
        );
        setRules(formattedRules);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRules();
  }, [user?.id]);

  const addNewRule = async (prevState: any, formData: FormData) => {
    if (!user?.id) {
      console.log("User needs to be logged in to add a Rule");
      return;
    }

    try {
        const newRule = await createRule(formData, user.id);
        if (newRule?.errors) {
          console.log(newRule.errors);
          return;
        }
        if (typeof newRule === "object" && "id" in newRule) {
          const formattedRule = formatRuleReturn(newRule);
          setRules((prev) => [...prev, formattedRule]);
        }
    } catch (error) {
      console.log("Error adding new Rule:", error);
    }
  };

  const patchAndSaveUpdatedRuleToRules = async (updatedRule: Rule) => {
    try {
      const returnedRule = await updateRule(updatedRule);
      if (typeof returnedRule === "object" && "id" in returnedRule) {
        const formattedRule = formatRuleReturn(returnedRule);
        setRules((prevRules) =>
          prevRules.map((Rule) =>
            Rule.id === formattedRule.id ? formattedRule : Rule
          )
        );
      }
    } catch (error) {
      console.log("Error adding new Rule:", error);
    }
  };

  const deleteRuleFromDb = async (ruleId: number) => {
    try {
      if (!user?.id) {
        console.log("User needs to be logged in to delete a Rule");
        return;
      }
      await deleteRule(ruleId);
      setRules((prev) => prev.filter((rule) => rule.id !== ruleId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RuleContext.Provider
      value={{
        rules,
        setRules,
        newRuleName,
        setNewRuleName,
        addNewRule,
        deleteRuleFromDb,
        patchAndSaveUpdatedRuleToRules,
      }}
    >
      {children}
    </RuleContext.Provider>
  );
}

export const useRuleContext = () => {
  const context = useContext(RuleContext);
  if (!context) {
    throw new Error("useRuleContext must be used within a RuleContextProvider");
  }
  return context;
};
