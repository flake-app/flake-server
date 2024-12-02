-- Create the users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,                  -- Unique identifier for each user (auto-incrementing integer)
    first_name VARCHAR(50) NOT NULL,       -- First name
    last_name VARCHAR(50) NOT NULL,        -- Last name
    email VARCHAR(255) UNIQUE NOT NULL,     -- Email address (unique constraint for validation)
    hashed_pw VARCHAR(255) NOT NULL,        -- Hashed password
    created_at TIMESTAMPTZ DEFAULT NOW()    -- Timestamp of user creation (default: NOW())
);

-- Create the events table
CREATE TABLE events (
    id SERIAL PRIMARY KEY,                  -- Unique identifier for each event (auto-incrementing integer)
    created_by INTEGER REFERENCES users(id) ON DELETE SET NULL, -- Foreign key referencing user ID
    event_name VARCHAR(255) NOT NULL,       -- Name of the event
    description TEXT,                       -- Description of the event
    start_time TIMESTAMPTZ NOT NULL,       -- Start time and date of the event
    end_time TIMESTAMPTZ,         -- End time and date of the event
    created_at TIMESTAMPTZ DEFAULT NOW(),  -- Timestamp of event creation (default: NOW())
    status VARCHAR(20) DEFAULT 'ONGOING' CHECK (status IN ('DELETED', 'ONGOING', 'COMPLETED', 'FLAKED')), -- Event status
    last_updated TIMESTAMPTZ DEFAULT NOW()  -- Timestamp of the last update to the event
);

-- Create the user_events table (Join Table)
CREATE TABLE user_events (
    id SERIAL PRIMARY KEY,                  -- Unique identifier for each record in the join table
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, -- Foreign key referencing user ID
    event_id INTEGER REFERENCES events(id) ON DELETE CASCADE, -- Foreign key referencing event ID
    attending BOOLEAN DEFAULT NULL,              -- Type indicating if the user is attending
    created_at TIMESTAMPTZ DEFAULT NOW(),    -- Timestamp of event creation 
    last_updated TIMESTAMPTZ DEFAULT NOW(),   -- Timestamp of the last user update to RSVP
    CONSTRAINT unique_user_event UNIQUE (user_id, event_id) -- Composite unique constraint
);

-- Create indexes for the user_event table
CREATE INDEX idx_user_events_user_id ON user_events(user_id);
CREATE INDEX idx_user_events_event_id ON user_events(event_id);


-- Insert dummy data into user table
INSERT INTO users (first_name, last_name, email, hashed_pw, created_at) VALUES
('Chak', 'Yeth', 'chak.yeth@gmail.com', 'password', NOW()),
('Jenny', 'Duong', 'itsjennyduong@gmail.com', 'password', NOW()),
('Vivian', 'Duong', 'mikovivian@gmail.com', 'password', NOW()); 


-- Insert dummy data into events table 
INSERT INTO events (created_by, event_name, description, start_time, end_time, created_at, status, last_updated) VALUES
(1, 'Intergalactic Karaoke with Cats', 'Sing your heart out to aliens while cats judge your performance. Cat costumes encouraged!', '2024-10-01 20:00:00+00', '2024-10-01 23:00:00+00', NOW(), 'ONGOING', NOW()),
(2, 'Haunted Marshmallow Roast', 'Join us for ghost stories told by marshmallows. Beware of the sticky specters!', '2024-10-02 19:00:00+00', '2024-10-02 22:00:00+00', NOW(), 'ONGOING', NOW()),
(3, 'Annual Llama Fashion Show', 'Watch llamas strut their stuff in outrageous outfits designed by local toddlers!', '2024-10-05 15:00:00+00', '2024-10-05 18:00:00+00', NOW(), 'ONGOING', NOW())

;

-- Insert dummy data into user_event table 
INSERT INTO user_events (user_id, event_id, attending, created_at, last_updated) VALUES
(1, 1, TRUE, NOW(), NOW()), -- Chak is attending Karaoke w Cats  
(2, 1, NULL, NOW(), NOW()), -- Jenny is invited to Karaoke w Cats  
(3, 1, NULL, NOW(), NOW()),  -- Vivian is invited to Karaoke w Cats 
(2, 2, TRUE, NOW(), NOW()), -- Jenny is attending Llama fashion SHOW
(1, 2, TRUE, NOW(), NOW()), -- Chak is attending Llama fashion show
(3, 3, TRUE, NOW(), NOW()), -- Vivian is attending Llama fashion show
(1, 3, TRUE, NOW(), NOW()), -- Chak is attending Llama fashion show 
(2, 3, FALSE, NOW(), NOW()) -- Jenny is NOT attending Llama fashion show 

;

-- see who is attending that damn llama event 
SELECT u.first_name, u.last_name, u.email, ue.attending, e.event_name, e.description FROM user_events ue
join users u ON u.id = ue.user_id 
JOIN events e ON e.id = ue.event_id
WHERE event_id =3 


-- look at tables 
TABLE users 

TABLE events 

TABLE user_events 
