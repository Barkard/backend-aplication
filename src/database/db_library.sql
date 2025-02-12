PGDMP  %                      }         
   db_library    17.2    17.2 9               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false                       1262    25045 
   db_library    DATABASE     �   CREATE DATABASE db_library WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Venezuela.1252';
    DROP DATABASE db_library;
                     Leon    false            �            1259    25172    books    TABLE     �  CREATE TABLE public.books (
    id_book integer NOT NULL,
    id_category_book integer,
    id_loans integer,
    id_lot integer,
    cota_book integer,
    name character varying(100),
    description character varying(255),
    editorial character varying(100),
    autor character varying(100),
    available_quantity integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.books;
       public         heap r       Leon    false            �            1259    25171    books_id_book_seq    SEQUENCE     �   CREATE SEQUENCE public.books_id_book_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.books_id_book_seq;
       public               Leon    false    228                       0    0    books_id_book_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.books_id_book_seq OWNED BY public.books.id_book;
          public               Leon    false    227            �            1259    25155    category_book    TABLE     4  CREATE TABLE public.category_book (
    id_category_book integer NOT NULL,
    category_name character varying(100),
    description_category character varying(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
 !   DROP TABLE public.category_book;
       public         heap r       Leon    false            �            1259    25154 "   category_book_id_category_book_seq    SEQUENCE     �   CREATE SEQUENCE public.category_book_id_category_book_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 9   DROP SEQUENCE public.category_book_id_category_book_seq;
       public               Leon    false    224                       0    0 "   category_book_id_category_book_seq    SEQUENCE OWNED BY     i   ALTER SEQUENCE public.category_book_id_category_book_seq OWNED BY public.category_book.id_category_book;
          public               Leon    false    223            �            1259    25140    loans    TABLE     I  CREATE TABLE public.loans (
    id_loans integer NOT NULL,
    uid_users integer,
    date_loans timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    status character varying(100),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.loans;
       public         heap r       Leon    false            �            1259    25139    loans_id_loans_seq    SEQUENCE     �   CREATE SEQUENCE public.loans_id_loans_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.loans_id_loans_seq;
       public               Leon    false    222                       0    0    loans_id_loans_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.loans_id_loans_seq OWNED BY public.loans.id_loans;
          public               Leon    false    221            �            1259    25164    lot    TABLE     �   CREATE TABLE public.lot (
    id_lot integer NOT NULL,
    library_name character varying(100),
    location character varying(255),
    current_quantity integer,
    last_updated timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.lot;
       public         heap r       Leon    false            �            1259    25163    lot_id_lot_seq    SEQUENCE     �   CREATE SEQUENCE public.lot_id_lot_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.lot_id_lot_seq;
       public               Leon    false    226                       0    0    lot_id_lot_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.lot_id_lot_seq OWNED BY public.lot.id_lot;
          public               Leon    false    225            �            1259    25199    return    TABLE     |   CREATE TABLE public.return (
    id_loans integer,
    date_return timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.return;
       public         heap r       Leon    false            �            1259    25109    role    TABLE       CREATE TABLE public.role (
    id_role integer NOT NULL,
    name character varying(100) NOT NULL,
    description character varying(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.role;
       public         heap r       Leon    false            �            1259    25108    role_id_role_seq    SEQUENCE     �   CREATE SEQUENCE public.role_id_role_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.role_id_role_seq;
       public               Leon    false    218                       0    0    role_id_role_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.role_id_role_seq OWNED BY public.role.id_role;
          public               Leon    false    217            �            1259    25118    users    TABLE     �  CREATE TABLE public.users (
    uid_users integer NOT NULL,
    id_role integer,
    name character varying(100),
    lastname character varying(100),
    id_card bigint,
    email character varying(100),
    password character varying(255),
    birthdate date,
    registration_date date DEFAULT CURRENT_DATE,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    is_active boolean DEFAULT true
);
    DROP TABLE public.users;
       public         heap r       Leon    false            �            1259    25117    usuario_uid_users_seq    SEQUENCE     �   CREATE SEQUENCE public.usuario_uid_users_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.usuario_uid_users_seq;
       public               Leon    false    220                       0    0    usuario_uid_users_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.usuario_uid_users_seq OWNED BY public.users.uid_users;
          public               Leon    false    219            O           2604    25175    books id_book    DEFAULT     n   ALTER TABLE ONLY public.books ALTER COLUMN id_book SET DEFAULT nextval('public.books_id_book_seq'::regclass);
 <   ALTER TABLE public.books ALTER COLUMN id_book DROP DEFAULT;
       public               Leon    false    227    228    228            J           2604    25158    category_book id_category_book    DEFAULT     �   ALTER TABLE ONLY public.category_book ALTER COLUMN id_category_book SET DEFAULT nextval('public.category_book_id_category_book_seq'::regclass);
 M   ALTER TABLE public.category_book ALTER COLUMN id_category_book DROP DEFAULT;
       public               Leon    false    223    224    224            F           2604    25143    loans id_loans    DEFAULT     p   ALTER TABLE ONLY public.loans ALTER COLUMN id_loans SET DEFAULT nextval('public.loans_id_loans_seq'::regclass);
 =   ALTER TABLE public.loans ALTER COLUMN id_loans DROP DEFAULT;
       public               Leon    false    221    222    222            M           2604    25167 
   lot id_lot    DEFAULT     h   ALTER TABLE ONLY public.lot ALTER COLUMN id_lot SET DEFAULT nextval('public.lot_id_lot_seq'::regclass);
 9   ALTER TABLE public.lot ALTER COLUMN id_lot DROP DEFAULT;
       public               Leon    false    226    225    226            >           2604    25112    role id_role    DEFAULT     l   ALTER TABLE ONLY public.role ALTER COLUMN id_role SET DEFAULT nextval('public.role_id_role_seq'::regclass);
 ;   ALTER TABLE public.role ALTER COLUMN id_role DROP DEFAULT;
       public               Leon    false    217    218    218            A           2604    25121    users uid_users    DEFAULT     t   ALTER TABLE ONLY public.users ALTER COLUMN uid_users SET DEFAULT nextval('public.usuario_uid_users_seq'::regclass);
 >   ALTER TABLE public.users ALTER COLUMN uid_users DROP DEFAULT;
       public               Leon    false    220    219    220                      0    25172    books 
   TABLE DATA           �   COPY public.books (id_book, id_category_book, id_loans, id_lot, cota_book, name, description, editorial, autor, available_quantity, created_at, updated_at) FROM stdin;
    public               Leon    false    228   jE                 0    25155    category_book 
   TABLE DATA           v   COPY public.category_book (id_category_book, category_name, description_category, created_at, updated_at) FROM stdin;
    public               Leon    false    224   �H                 0    25140    loans 
   TABLE DATA           `   COPY public.loans (id_loans, uid_users, date_loans, status, created_at, updated_at) FROM stdin;
    public               Leon    false    222   �I                 0    25164    lot 
   TABLE DATA           ]   COPY public.lot (id_lot, library_name, location, current_quantity, last_updated) FROM stdin;
    public               Leon    false    226   �I                 0    25199    return 
   TABLE DATA           7   COPY public.return (id_loans, date_return) FROM stdin;
    public               Leon    false    229   J       �          0    25109    role 
   TABLE DATA           R   COPY public.role (id_role, name, description, created_at, updated_at) FROM stdin;
    public               Leon    false    218   9J       �          0    25118    users 
   TABLE DATA           �   COPY public.users (uid_users, id_role, name, lastname, id_card, email, password, birthdate, registration_date, created_at, updated_at, is_active) FROM stdin;
    public               Leon    false    220   �J                  0    0    books_id_book_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.books_id_book_seq', 10, true);
          public               Leon    false    227                       0    0 "   category_book_id_category_book_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.category_book_id_category_book_seq', 5, true);
          public               Leon    false    223                       0    0    loans_id_loans_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.loans_id_loans_seq', 1, false);
          public               Leon    false    221                       0    0    lot_id_lot_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.lot_id_lot_seq', 1, true);
          public               Leon    false    225                       0    0    role_id_role_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.role_id_role_seq', 2, true);
          public               Leon    false    217                       0    0    usuario_uid_users_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.usuario_uid_users_seq', 10, true);
          public               Leon    false    219            b           2606    25183    books books_cota_book_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_cota_book_key UNIQUE (cota_book);
 C   ALTER TABLE ONLY public.books DROP CONSTRAINT books_cota_book_key;
       public                 Leon    false    228            d           2606    25181    books books_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id_book);
 :   ALTER TABLE ONLY public.books DROP CONSTRAINT books_pkey;
       public                 Leon    false    228            ^           2606    25162     category_book category_book_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.category_book
    ADD CONSTRAINT category_book_pkey PRIMARY KEY (id_category_book);
 J   ALTER TABLE ONLY public.category_book DROP CONSTRAINT category_book_pkey;
       public                 Leon    false    224            \           2606    25148    loans loans_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.loans
    ADD CONSTRAINT loans_pkey PRIMARY KEY (id_loans);
 :   ALTER TABLE ONLY public.loans DROP CONSTRAINT loans_pkey;
       public                 Leon    false    222            `           2606    25170    lot lot_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.lot
    ADD CONSTRAINT lot_pkey PRIMARY KEY (id_lot);
 6   ALTER TABLE ONLY public.lot DROP CONSTRAINT lot_pkey;
       public                 Leon    false    226            T           2606    25116    role role_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id_role);
 8   ALTER TABLE ONLY public.role DROP CONSTRAINT role_pkey;
       public                 Leon    false    218            V           2606    25133    users usuario_email_key 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT usuario_email_key UNIQUE (email);
 A   ALTER TABLE ONLY public.users DROP CONSTRAINT usuario_email_key;
       public                 Leon    false    220            X           2606    25131    users usuario_id_card_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT usuario_id_card_key UNIQUE (id_card);
 C   ALTER TABLE ONLY public.users DROP CONSTRAINT usuario_id_card_key;
       public                 Leon    false    220            Z           2606    25129    users usuario_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.users
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (uid_users);
 <   ALTER TABLE ONLY public.users DROP CONSTRAINT usuario_pkey;
       public                 Leon    false    220            g           2606    25184 !   books books_id_category_book_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_id_category_book_fkey FOREIGN KEY (id_category_book) REFERENCES public.category_book(id_category_book);
 K   ALTER TABLE ONLY public.books DROP CONSTRAINT books_id_category_book_fkey;
       public               Leon    false    224    4702    228            h           2606    25189    books books_id_loans_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_id_loans_fkey FOREIGN KEY (id_loans) REFERENCES public.loans(id_loans);
 C   ALTER TABLE ONLY public.books DROP CONSTRAINT books_id_loans_fkey;
       public               Leon    false    222    228    4700            i           2606    25194    books books_id_lot_fkey    FK CONSTRAINT     w   ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_id_lot_fkey FOREIGN KEY (id_lot) REFERENCES public.lot(id_lot);
 A   ALTER TABLE ONLY public.books DROP CONSTRAINT books_id_lot_fkey;
       public               Leon    false    226    4704    228            f           2606    25149    loans loans_uid_users_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.loans
    ADD CONSTRAINT loans_uid_users_fkey FOREIGN KEY (uid_users) REFERENCES public.users(uid_users);
 D   ALTER TABLE ONLY public.loans DROP CONSTRAINT loans_uid_users_fkey;
       public               Leon    false    4698    222    220            j           2606    25203    return return_id_loans_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.return
    ADD CONSTRAINT return_id_loans_fkey FOREIGN KEY (id_loans) REFERENCES public.loans(id_loans);
 E   ALTER TABLE ONLY public.return DROP CONSTRAINT return_id_loans_fkey;
       public               Leon    false    229    222    4700            e           2606    25134    users usuario_id_role_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.users
    ADD CONSTRAINT usuario_id_role_fkey FOREIGN KEY (id_role) REFERENCES public.role(id_role);
 D   ALTER TABLE ONLY public.users DROP CONSTRAINT usuario_id_role_fkey;
       public               Leon    false    4692    218    220                 x����r�H�ϓ���Wd珓�)lH������Զzw4��9��k�����7�I��� [��F����}�u;3���Z?����̨���6 K�%����f��8O[���9Z���c��(�ӡ��'��Ņ�kXP�#r@E��o]���ǁ��x��/�E/23l��sO�I������I6|�e0]�����`<�g���:v�f�ʦ�*r�L?�6��rQ`ɪ)I��q�wHۣ�[@r%�\�`	�c�j)rOʰ����F��Jaod�N/2�IO������~7ok��c���T��
��$Y�v8��U->&�������6>4��r{���ư'�q��xO�F�q,����--�mx@uR%i��Hv�s��?������YOM�
�@s)��\���a.^̸'�I��\�:�؍6J�M�I��mu��(�x(hMV�)�Z*@�	��.��.�yM]�/<��g�U�0�,y�7N�ݧ杸�����ҾU��I�jBT�(�(XP��4��yN�6J�T�K���fAJsv���r 3������j�:j��mr#���Iw����w�m;���R�8��|j\vڞ�����F�����z�.�����Yt�DS+��>p��;@csE1*F�����a^�I����q+Ĵ�E�s���y�ynn5�b�m���2l��斩���L�Ј��9<��VA~�n�N���y��I�&�07�=�ka��:��R����ζ45�ضg�NE�0�9&���+����]���F%1Y�S�����7C?5�         �   x����R�0�g�)��5n
\G`be�htul�� }{��^aa�d�������3�@#*;1�)
T�	�k	=��7���f)Jk����ή��fg�;{���}����j�yqL���oiR��S�0��+Sᑢ�@~��6�ES9�q:�z_H���F�狩�>�{M�}�3�{��J��F��]�<�(2�O\��ҘS�r�0��g*��l��}�<���,n��5��i����R�k�4�7哫�            x������ � �         ]   x���
�  �Y��5��T�ֆhn9��@,�����l�������k�Jk�W���4�����"�D���;"��)�<2#.�����$            x������ � �      �   �   x���1�@��=�\ �N0&t^��f�A6�;ff	�����z�+��7�����b��N=%�DU�}�i@i�H�y� k�{YR�
��)=��b{��:7M���尸��,�L��c�%5�9tJ���X)I�̂e���_��rνV~G�      �   �  x���Kj�0���S�z��UK-!�Җ����:�V*;��6Yf�U���u��i��"�0���㟑8poT��`���a'i�`��t�q�V�r]h:3���Y���@0.�>o�16�͸���5�@������T;�/P�5�P*�+�D���4",%]�#A�����a�~��Ҫ�� -̺/�3>�I�&w���4�X�I+"AU�b2M^�e�&�dC�`=�l����ܾ��K�B��~"R�t�Jφ�����,�������2�f��bU��N��W�$ؤ�����V�Кİ:ڜ@w�°r8�J�*���������si]��s٪�΅��B&�&=�zi`j,^�Z�����sA���A�����w�y��.a�qJ�t{ft����:e!a~!�A� �B	T�     