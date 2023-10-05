create or replace function max_walk_updated_at() returns timestamptz as
$$
select max(updated_at)
from walks;
$$ language sql;