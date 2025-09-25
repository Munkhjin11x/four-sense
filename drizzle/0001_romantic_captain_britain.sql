PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_Orders` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`table_id` integer NOT NULL,
	`table_name` text NOT NULL,
	`name` text NOT NULL,
	`phone` text NOT NULL,
	`email` text NOT NULL,
	`order_date` text NOT NULL,
	FOREIGN KEY (`table_id`) REFERENCES `Tables`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_Orders`("id", "table_id", "table_name", "name", "phone", "email", "order_date") SELECT "id", "table_id", "table_name", "name", "phone", "email", "order_date" FROM `Orders`;--> statement-breakpoint
DROP TABLE `Orders`;--> statement-breakpoint
ALTER TABLE `__new_Orders` RENAME TO `Orders`;--> statement-breakpoint
PRAGMA foreign_keys=ON;