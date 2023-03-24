-- Deploy mygreensneaker:sizeToOrderLine to pg

BEGIN;

ALTER TABLE "order_line"
ADD "size" INT NOT NULL;

COMMIT;
