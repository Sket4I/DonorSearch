--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4
-- Dumped by pg_dump version 13.4

-- Started on 2024-02-24 07:27:41

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- TOC entry 3027 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 205 (class 1259 OID 662409)
-- Name: donationHistories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."donationHistories" (
    id integer NOT NULL,
    "donorId" integer NOT NULL,
    "dateOfDonation" timestamp without time zone NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- TOC entry 204 (class 1259 OID 662407)
-- Name: donationHistories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."donationHistories_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3028 (class 0 OID 0)
-- Dependencies: 204
-- Name: donationHistories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."donationHistories_id_seq" OWNED BY public."donationHistories".id;


--
-- TOC entry 207 (class 1259 OID 662417)
-- Name: donationRequests; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."donationRequests" (
    id integer NOT NULL,
    "petId" integer NOT NULL,
    city character varying(255) NOT NULL,
    "amountOfBlood" integer NOT NULL,
    "dateEndOfSearch" timestamp without time zone NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- TOC entry 206 (class 1259 OID 662415)
-- Name: donationRequests_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."donationRequests_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3029 (class 0 OID 0)
-- Dependencies: 206
-- Name: donationRequests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."donationRequests_id_seq" OWNED BY public."donationRequests".id;


--
-- TOC entry 203 (class 1259 OID 662398)
-- Name: pets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pets (
    id integer NOT NULL,
    "petName" character varying(255) NOT NULL,
    "petType" character varying(255) NOT NULL,
    breed character varying(255),
    age integer NOT NULL,
    weight double precision NOT NULL,
    "bloodTransfusion" boolean NOT NULL,
    "ownerId" integer NOT NULL,
    "bloodCenter" integer,
    donor boolean NOT NULL,
    "numberOfDonations" integer,
    "lastDonation" timestamp without time zone,
    "petAvatar" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- TOC entry 202 (class 1259 OID 662396)
-- Name: pets_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.pets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3030 (class 0 OID 0)
-- Dependencies: 202
-- Name: pets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.pets_id_seq OWNED BY public.pets.id;


--
-- TOC entry 201 (class 1259 OID 662385)
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    login character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "fullName" character varying(255) NOT NULL,
    city character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- TOC entry 200 (class 1259 OID 662383)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3031 (class 0 OID 0)
-- Dependencies: 200
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 2872 (class 2604 OID 662412)
-- Name: donationHistories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."donationHistories" ALTER COLUMN id SET DEFAULT nextval('public."donationHistories_id_seq"'::regclass);


--
-- TOC entry 2873 (class 2604 OID 662420)
-- Name: donationRequests id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."donationRequests" ALTER COLUMN id SET DEFAULT nextval('public."donationRequests_id_seq"'::regclass);


--
-- TOC entry 2871 (class 2604 OID 662401)
-- Name: pets id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pets ALTER COLUMN id SET DEFAULT nextval('public.pets_id_seq'::regclass);


--
-- TOC entry 2870 (class 2604 OID 662388)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3019 (class 0 OID 662409)
-- Dependencies: 205
-- Data for Name: donationHistories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."donationHistories" (id, "donorId", "dateOfDonation", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 3021 (class 0 OID 662417)
-- Dependencies: 207
-- Data for Name: donationRequests; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."donationRequests" (id, "petId", city, "amountOfBlood", "dateEndOfSearch", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 3017 (class 0 OID 662398)
-- Dependencies: 203
-- Data for Name: pets; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pets (id, "petName", "petType", breed, age, weight, "bloodTransfusion", "ownerId", "bloodCenter", donor, "numberOfDonations", "lastDonation", "petAvatar", "createdAt", "updatedAt") FROM stdin;
2	Володимир	Собака	Хаски	4	6	t	1	\N	t	0	\N	1-dog.jpg	2024-02-24 02:33:15.258+03	2024-02-24 02:33:15.258+03
\.


--
-- TOC entry 3015 (class 0 OID 662385)
-- Dependencies: 201
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, login, password, "fullName", city, "createdAt", "updatedAt") FROM stdin;
1	89522284114	$2b$10$IyQnwDabcYbBjHzQ3UnHye0DVy71qOaRhlZUVbs0eiJuJ367bePc.	Цепляев Илья Вячеславович	Санкт-Петербург	2024-02-24 01:49:04.221+03	2024-02-24 01:49:04.221+03
\.


--
-- TOC entry 3032 (class 0 OID 0)
-- Dependencies: 204
-- Name: donationHistories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."donationHistories_id_seq"', 1, false);


--
-- TOC entry 3033 (class 0 OID 0)
-- Dependencies: 206
-- Name: donationRequests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."donationRequests_id_seq"', 1, false);


--
-- TOC entry 3034 (class 0 OID 0)
-- Dependencies: 202
-- Name: pets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.pets_id_seq', 2, true);


--
-- TOC entry 3035 (class 0 OID 0)
-- Dependencies: 200
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- TOC entry 2881 (class 2606 OID 662414)
-- Name: donationHistories donationHistories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."donationHistories"
    ADD CONSTRAINT "donationHistories_pkey" PRIMARY KEY (id);


--
-- TOC entry 2883 (class 2606 OID 662422)
-- Name: donationRequests donationRequests_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."donationRequests"
    ADD CONSTRAINT "donationRequests_pkey" PRIMARY KEY (id);


--
-- TOC entry 2879 (class 2606 OID 662406)
-- Name: pets pets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pets
    ADD CONSTRAINT pets_pkey PRIMARY KEY (id);


--
-- TOC entry 2875 (class 2606 OID 662395)
-- Name: users users_login_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_login_key UNIQUE (login);


--
-- TOC entry 2877 (class 2606 OID 662393)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


-- Completed on 2024-02-24 07:27:41

--
-- PostgreSQL database dump complete
--

