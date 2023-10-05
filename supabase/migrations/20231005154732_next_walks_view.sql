create view
    next_walks as
select *
from walks
where date = (select date from walks where date >= current_date order by date limit 1);
