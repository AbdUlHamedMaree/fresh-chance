CREATE TABLE IF NOT EXISTS "assets_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"price" integer NOT NULL,
	"original_price" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "original_price_gt_price_check" CHECK ("products_table"."original_price" > "products_table"."price")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "product_assets" (
	"product_id" uuid NOT NULL,
	"asset_id" uuid NOT NULL,
	CONSTRAINT "product_assets_product_id_asset_id_pk" PRIMARY KEY("product_id","asset_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_assets" ADD CONSTRAINT "product_assets_product_id_products_table_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_assets" ADD CONSTRAINT "product_assets_asset_id_assets_table_id_fk" FOREIGN KEY ("asset_id") REFERENCES "public"."assets_table"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
