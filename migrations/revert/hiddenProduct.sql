-- Revert mygreensneaker:hiddenProduct from pg

BEGIN;

ALTER TABLE "product" DROP COLUMN "hidden";

COMMIT;