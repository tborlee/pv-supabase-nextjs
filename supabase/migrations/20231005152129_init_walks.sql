create type walk_activity as enum ('walk', 'orientation');
create type walk_status as enum ('ok', 'modified', 'cancelled');

create extension postgis with schema extensions;

create table if not exists walks
(
    id                   integer primary key    not null,
    date                 date                   not null,
    activity             walk_activity          not null,
    organizer            character varying(100) not null,
    entity               character varying(25)  not null,
    latitude             numeric                not null,
    longitude            numeric                not null,
    geopoint             geography              not null,
    ign                  character varying(6)   null,
    locality             character varying(50)  not null,
    transport            character varying(200) null,
    meeting_point_info   character varying(200) null,
    province             character varying(20)  not null,
    contact_first_name   character varying(20)  not null,
    contact_last_name    character varying(20)  not null,
    contact_phone_number character varying(20)  null,
    status               walk_status            not null,
    meeting_point        character varying(200) not null,
    fifteen_km           boolean                not null default false,
    wheelchair           boolean                not null default false,
    stroller             boolean                not null default false,
    extra_orientation    boolean                not null default false,
    guided               boolean                not null default false,
    extra_walk           boolean                not null default false,
    bike                 boolean                not null default false,
    mountain_bike        boolean                not null default false,
    water_supply         boolean                not null default false,
    be_wapp              boolean                not null default false,
    adep_sante           boolean                not null default false,
    created_at           timestamp with time zone        default timezone('utc'::text, now()) not null,
    updated_at           timestamp with time zone        default timezone('utc'::text, now()) not null
);

create index if not exists walks_date_idx on walks (date);

alter table walks
    enable row level security;

create policy "Walks are viewable by everyone"
    on walks for select
    to authenticated, anon
    using (true);
