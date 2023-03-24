Deploy mygreensneaker:hiddenProduct to pg BEGIN;

ALTER TABLE "product"
ADD
    COLUMN "hidden" BOOLEAN NOT NULL DEFAULT FALSE;

COMMIT;