import { pgTable, text, integer } from "drizzle-orm/pg-core"
import { createInsertSchema } from "drizzle-zod"

export const accounts = pgTable("accounts", {
    id: text("id").primaryKey(),
    plaidId: text("plaid_id"),
    name: text("name").notNull(),
    userId: text("user_id").notNull(),
})

export const insertAccountSchema = createInsertSchema(accounts)

export const categories  = pgTable("categories", {
    id: text("id").primaryKey(),
    plaidId: text("plaid_id"),
    name: text("name").notNull(),
    userId: text("user_id").notNull(),
})

export const insertCategorySchema = createInsertSchema(categories)

export const transactions = pgTable("transactions", {
    id: text("id").primaryKey(),
    amount: integer("amount").notNull(),
    accountId: text("account_id").notNull(),
    categoryId: text("category_id").notNull(),
    date: text("date").notNull(),
    description: text("description").notNull(),
    merchant: text("merchant").notNull(),
    userId: text("user_id").notNull(),
})