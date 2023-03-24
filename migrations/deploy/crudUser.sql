Deploy mygreensneaker:crudUser to pg BEGIN;

ALTER TABLE "user" ALTER COLUMN "id_user" SET DEFAULT 2;

COMMIT;