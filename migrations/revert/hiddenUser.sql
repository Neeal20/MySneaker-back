-- Revert mygreensneaker:hiddenUser from pg

BEGIN;

ALTER TABLE "user" DROP COLUMN "hidden";

COMMIT;