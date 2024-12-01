ALTER TABLE "assets_table" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "products_table" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "product_assets" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "products_table" ALTER COLUMN "user_id" SET DEFAULT (auth.user_id());--> statement-breakpoint
ALTER TABLE "products_table" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "assets_table" ADD COLUMN "user_id" text DEFAULT (auth.user_id()) NOT NULL;--> statement-breakpoint
ALTER TABLE "product_assets" ADD COLUMN "user_id" text DEFAULT (auth.user_id()) NOT NULL;--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-select" ON "assets_table" AS PERMISSIVE FOR SELECT TO "anonymous" USING (true);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-insert" ON "assets_table" AS PERMISSIVE FOR INSERT TO "anonymous" WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-update" ON "assets_table" AS PERMISSIVE FOR UPDATE TO "anonymous" USING (false) WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-delete" ON "assets_table" AS PERMISSIVE FOR DELETE TO "anonymous" USING (false);--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-select" ON "assets_table" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-insert" ON "assets_table" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ((select auth.user_id() = "assets_table"."user_id"));--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-update" ON "assets_table" AS PERMISSIVE FOR UPDATE TO "authenticated" USING ((select auth.user_id() = "assets_table"."user_id")) WITH CHECK ((select auth.user_id() = "assets_table"."user_id"));--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-delete" ON "assets_table" AS PERMISSIVE FOR DELETE TO "authenticated" USING ((select auth.user_id() = "assets_table"."user_id"));--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-select" ON "products_table" AS PERMISSIVE FOR SELECT TO "anonymous" USING (true);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-insert" ON "products_table" AS PERMISSIVE FOR INSERT TO "anonymous" WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-update" ON "products_table" AS PERMISSIVE FOR UPDATE TO "anonymous" USING (false) WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-delete" ON "products_table" AS PERMISSIVE FOR DELETE TO "anonymous" USING (false);--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-select" ON "products_table" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-insert" ON "products_table" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ((select auth.user_id() = "products_table"."user_id"));--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-update" ON "products_table" AS PERMISSIVE FOR UPDATE TO "authenticated" USING ((select auth.user_id() = "products_table"."user_id")) WITH CHECK ((select auth.user_id() = "products_table"."user_id"));--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-delete" ON "products_table" AS PERMISSIVE FOR DELETE TO "authenticated" USING ((select auth.user_id() = "products_table"."user_id"));--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-select" ON "product_assets" AS PERMISSIVE FOR SELECT TO "anonymous" USING (true);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-insert" ON "product_assets" AS PERMISSIVE FOR INSERT TO "anonymous" WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-update" ON "product_assets" AS PERMISSIVE FOR UPDATE TO "anonymous" USING (false) WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-delete" ON "product_assets" AS PERMISSIVE FOR DELETE TO "anonymous" USING (false);--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-select" ON "product_assets" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-insert" ON "product_assets" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ((select auth.user_id() = "product_assets"."user_id"));--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-update" ON "product_assets" AS PERMISSIVE FOR UPDATE TO "authenticated" USING ((select auth.user_id() = "product_assets"."user_id")) WITH CHECK ((select auth.user_id() = "product_assets"."user_id"));--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-delete" ON "product_assets" AS PERMISSIVE FOR DELETE TO "authenticated" USING ((select auth.user_id() = "product_assets"."user_id"));