-- Deploy mygreensneaker:hiddenUser to pg

BEGIN;

ALTER TABLE "user"
ADD
    COLUMN "hidden" BOOLEAN NOT NULL DEFAULT FALSE;

COMMIT;