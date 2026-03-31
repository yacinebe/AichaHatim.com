-- AichaHatim.com — Database Schema

-- ── Admin ──
CREATE TABLE IF NOT EXISTS admin_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Client auth ──
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS magic_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  used BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS client_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── CMS content ──
CREATE TABLE IF NOT EXISTS page_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page TEXT NOT NULL,
  key TEXT NOT NULL,
  value TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (page, key)
);

CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author TEXT NOT NULL,
  role TEXT,
  quote TEXT,
  youtube_url TEXT,
  photo_url TEXT,
  position INT NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS faq (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  position INT NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS podcast_episodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  embed_url TEXT NOT NULL,
  published_at DATE,
  position INT NOT NULL DEFAULT 0,
  is_visible BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL UNIQUE,
  url TEXT NOT NULL,
  is_visible BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size_bytes INT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Resources (prospects + clients) ──
CREATE TABLE IF NOT EXISTS resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL,
  url TEXT NOT NULL,
  access TEXT NOT NULL DEFAULT 'client',
  position INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Workbook (Bilan de Compétences) ──
CREATE TABLE IF NOT EXISTS workbook_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  intro_html TEXT,
  position INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS workbook_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID NOT NULL REFERENCES workbook_sections(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  hint TEXT,
  type TEXT NOT NULL DEFAULT 'textarea',
  options JSONB,
  position INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS workbook_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES workbook_questions(id) ON DELETE CASCADE,
  answer TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (client_id, question_id)
);

-- ── E-commerce ──
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  price_cents INT NOT NULL,
  stripe_price_id TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id),
  email TEXT NOT NULL,
  product_id UUID NOT NULL REFERENCES products(id),
  stripe_session_id TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Marketing ──
CREATE TABLE IF NOT EXISTS email_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  source TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Default seed data ──
INSERT INTO social_links (platform, url) VALUES
  ('instagram', 'https://instagram.com/aichahatim'),
  ('linkedin',  'https://linkedin.com/in/aichahatim'),
  ('youtube',   'https://youtube.com/@aichahatim'),
  ('calendly',  'https://calendly.com/aichahatim')
ON CONFLICT (platform) DO NOTHING;

INSERT INTO page_content (page, key, value) VALUES
  ('home', 'hero_title',       'Révélez votre plein potentiel'),
  ('home', 'hero_subtitle',    'Accompagnement en développement personnel et professionnel'),
  ('home', 'hero_cta',         'Réserver un appel gratuit'),
  ('home', 'vsl_url',          ''),
  ('home', 'about_teaser',     'Je suis Aicha Hatim, coach professionnelle certifiée ICF. Mon approche allie rigueur et bienveillance pour vous aider à franchir vos obstacles et construire la vie qui vous ressemble.'),
  ('home', 'instagram_widget_id', ''),
  ('about', 'bio_html',        '<p>Aicha Hatim est coach professionnelle certifiée ICF et CTI, spécialisée dans le bilan de compétences et l''accompagnement de transitions professionnelles.</p>'),
  ('about', 'approach_html',   '<p>Mon approche est fondée sur l''écoute active, la co-création et le respect de votre rythme.</p>'),
  ('podcast', 'intro_html',    '<p>Bienvenue sur mon podcast, où j''explore les thèmes du développement personnel, de la carrière et du bien-être.</p>')
ON CONFLICT (page, key) DO NOTHING;

INSERT INTO faq (question, answer, position) VALUES
  ('Qu''est-ce que le coaching ?', 'Le coaching est un accompagnement personnalisé qui vous aide à clarifier vos objectifs et à mobiliser vos ressources pour les atteindre.', 0),
  ('Comment se déroule une séance ?', 'Chaque séance dure 60 à 90 minutes, en visioconférence ou en présentiel. Nous travaillons ensemble sur vos priorités du moment.', 1),
  ('Combien de séances faut-il ?', 'Un accompagnement type comprend entre 6 et 12 séances selon vos objectifs. Nous évaluons régulièrement vos avancées.', 2)
ON CONFLICT DO NOTHING;
