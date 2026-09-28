create extension if not exists pgcrypto;

create table if not exists public.menu (
    id uuid primary key default gen_random_uuid(),
    nombre text not null,
    descripcion text,
    precio numeric(10,2) not null check (precio >= 0),
    categoria text not null check (categoria in ('clasicas', 'especiales', 'acompanamientos', 'bebidas')),
    imagen_url text,
    disponible boolean not null default true,
    orden int not null default 0,
    created_at timestamptz not null default now()
);

create table if not exists public.resenas (
    id uuid primary key default gen_random_uuid(),
    nombre_cliente text not null check (char_length(nombre_cliente) between 2 and 60),
    calificacion int not null check (calificacion between 1 and 5),
    comentario text not null check (char_length(comentario) between 1 and 500),
    aprobada boolean not null default false,
    created_at timestamptz not null default now()
);

create index if not exists menu_disponible_orden_idx on public.menu (disponible, orden);
create index if not exists resenas_aprobada_created_idx on public.resenas (aprobada, created_at desc);

alter table public.menu enable row level security;
alter table public.resenas enable row level security;

drop policy if exists "menu disponible visible publicamente" on public.menu;
create policy "menu disponible visible publicamente"
    on public.menu for select
    to anon, authenticated
    using (disponible = true);

drop policy if exists "resenas aprobadas visibles publicamente" on public.resenas;
create policy "resenas aprobadas visibles publicamente"
    on public.resenas for select
    to anon, authenticated
    using (aprobada = true);

drop policy if exists "visitantes pueden enviar resenas pendientes" on public.resenas;
create policy "visitantes pueden enviar resenas pendientes"
    on public.resenas for insert
    to anon, authenticated
    with check (aprobada = false);

revoke all on public.menu from anon, authenticated;
revoke all on public.resenas from anon, authenticated;
grant select on public.menu to anon, authenticated;
grant select on public.resenas to anon, authenticated;
grant insert (nombre_cliente, calificacion, comentario, aprobada) on public.resenas to anon, authenticated;