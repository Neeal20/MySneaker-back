-- Revert mygreensneaker:sizeToOrderLine from pg

BEGIN;


ALTER TABLE "order_line"
DROP "size"

COMMIT;
