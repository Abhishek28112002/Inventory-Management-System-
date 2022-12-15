-- Table: public.User

-- DROP TABLE IF EXISTS public."User";

CREATE TABLE IF NOT EXISTS public."User"
(
    userId integer NOT NULL,
    username text COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    LoggedIn boolean DEFAULT true,
    Events text[{ InvitedUser} ] COLLATE pg_catalog."default",
    CONSTRAINT "User_pkey" PRIMARY KEY (id, username, email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."User"
    OWNER to postgres;

-- Table: public.InvitedUser

-- DROP TABLE IF EXISTS public."InvitedUser";

CREATE TABLE IF NOT EXISTS public."InvitedUser"
(
    "userId" integer NOT NULL,
    status text COLLATE pg_catalog."default" NOT NULL,
    "invitedAt" time without time zone NOT NULL DEFAULT now(),
    "EventId" integer
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."InvitedUser"
    OWNER to postgres;

-- Table: public.Event

-- DROP TABLE IF EXISTS public."Event";

CREATE TABLE IF NOT EXISTS public."Event"
(
    "EventId" integer NOT NULL,
    "description" text COLLATE pg_catalog."default" NOT NULL,
    "invitedUser" text[] COLLATE pg_catalog."default" NOT NULL,
    "createdAt" time without time zone DEFAULT now(),
    "userId" integer NOT NULL,
    CONSTRAINT "Event_pkey" PRIMARY KEY ("EventId", "invitedUser")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Event"
    OWNER to postgres;