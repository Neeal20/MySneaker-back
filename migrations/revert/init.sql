-- Revert mygreensneaker:init from pg

BEGIN;

DROP TABLE "address" CASCADE;

DROP TABLE "order_line" CASCADE;

DROP TABLE "size_to_product" CASCADE;

DROP TABLE "user" CASCADE;

DROP TABLE "role" CASCADE;

DROP TABLE "size" CASCADE;

DROP TABLE "order" CASCADE;

DROP TABLE "product" CASCADE;

COMMIT;
