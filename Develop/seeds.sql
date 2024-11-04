-- Insert initial departments
INSERT INTO department (name) VALUES 
('Engineering'),
('Human Resources'),
('Sales'),
('Finance');

-- Insert initial roles
INSERT INTO role (title, salary, department_id) VALUES 
('Software Engineer', 80000, 1),
('HR Manager', 60000, 2),
('Sales Representative', 50000, 3),
('Financial Analyst', 70000, 4);

-- Insert initial employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Bob', 'Johnson', 3, 1),
('Alice', 'Davis', 4, NULL),
('Tom', 'Brown', 3, 2);