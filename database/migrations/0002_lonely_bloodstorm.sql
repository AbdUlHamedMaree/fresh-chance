ALTER TABLE "product_assets" DROP CONSTRAINT "product_assets_product_id_products_table_id_fk";
--> statement-breakpoint
ALTER TABLE "product_assets" DROP CONSTRAINT "product_assets_asset_id_assets_table_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_assets" ADD CONSTRAINT "product_assets_product_id_products_table_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_assets" ADD CONSTRAINT "product_assets_asset_id_assets_table_id_fk" FOREIGN KEY ("asset_id") REFERENCES "public"."assets_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
