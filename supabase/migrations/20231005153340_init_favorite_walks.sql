create table if not exists favorite_walks
(
    walk_id    integer references walks                                        not null,
    user_id    uuid references auth.users default auth.uid(),
    created_at timestamp with time zone   default timezone('utc'::text, now()) not null,
    primary key (user_id, walk_id)
);

alter table favorite_walks
    enable row level security;

create policy "Individuals can create favorite walks." on favorite_walks for
    insert with check (auth.uid() = user_id);
create policy "Individuals can view their own favorite walks." on favorite_walks for
    select using (auth.uid() = user_id);
create policy "Individuals can update their own favorite walks." on favorite_walks for
    update using (auth.uid() = user_id);
create policy "Individuals can delete their own favorite walks." on favorite_walks for
    delete using (auth.uid() = user_id);