INSERT INTO department (department_name)
VALUES  ('Management'),
        ('Sales'),
        ('Engineering'),
        ('Finance'),
        ('Legal');


INSERT INTO roles (title, salary, department_id)
VALUES  ("Sales Lead", 100000, 2),
        ("Salesperson", 80000, 2),
        ("Lead Engineer", 150000, 3),
        ("Software Engineer", 120000, 3),
        ("Account Manager", 160000, 4),
        ("Accountant", 125000, 4),
        ("Legal Team Lead", 250000, 5),
        ("Lawyer", 190000, 5);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Chip", "Whitley", 1, NULL),
        ("Gob", "Cusack", 2, 1),
        ("John", "Leguizamo", 3, NULL),
        ("Kev", "The Dev", 4, 3),
        ("Michael", "Bolton", 5, NULL),
        ("Cheff", "Brown", 6, 5),
        ("Sarah", "Gourd", 7, NULL),
        ("Paul", "Allen", 8, 7);