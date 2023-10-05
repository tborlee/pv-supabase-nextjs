create view distinct_walk_dates as
select distinct date
from walks
order by date;