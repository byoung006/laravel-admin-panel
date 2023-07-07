# Laravel Admin Panel

This is a Laravel application with a user interface and an admin panel. The application allows users to perform basic CRUD operations (Create, Read, Update, Delete) on certain resources.

## Features

- User Interface: Users can interact with the application through a user-friendly interface.
- Admin Panel: An admin panel is available for managing the application's resources.
- CRUD Operations: Users can perform Create, Read, Update, and Delete operations on the specified resources.
- Separate Admin Login: The admin panel login is accessible via the `admin/login` route.

## Requirements
- VirtualBox or Parallels installed on your local machine
- PHP 8.2 or higher
- Composer
- Laravel 9.x Using the Breeze package https://laravel.com/docs/10.x/starter-kits#breeze-and-inertia
- Laravel's Homestead package found at https://laravel.com/docs/10.x/homestead#installation-and-setup 
- MySQL or any other supported database

## Installation

1. Clone both the `laravel-admin-panel` and `homestead` repositories to to a common directory on your local machine:
```bash
git clone git@github.com:byoung006/laravel-admin-panel.git`
```
2. Create a new Homestead.yaml file in the `homestead` directory and run the init.sh script:
```bash 
cd homestead 
bash init.sh
```
3.  Edit the Homestead.yaml file to include the following:
```yaml
---
ip: "192.168.56.56"
memory: 2048
cpus: 2
provider: virtualbox
name: laravel-admin-panel
authorize: ~/.ssh/id_rsa.pub

keys:
  - ~/.ssh/id_rsa

folders:
  - map: ~/some-directory-of-your-choosing/laravel-admin-panel/admin-panel/
    to: /home/vagrant/laravel-admin-panel/admin-panel/

sites:
  - map: admin-panel.test
    to: /home/vagrant/laravel-admin-panel/admin-panel/public


databases:
  - homestead
features:
  - mysql: true
  - mariadb: false
  - postgresql: false
  - ohmyzsh: false
  - webdriver: false

services:
  - enabled:
      - "mysql"
#  These are disabled by default, but can be enabled if you need
#  to access these resources based on your implementation
#    - disabled:
#        - "postgresql@11-main"

#ports:
#    - send: 33060 # MySQL/MariaDB
#      to: 3306
#    - send: 4040
#      to: 4040
#    - send: 54320 # PostgreSQL
#      to: 5432
#    - send: 8025 # Mailhog
#      to: 8025
#    - send: 9600
#      to: 9600
#    - send: 27017
#      to: 27017
```
4. No we need to start the vagrant box and ssh into it to finish the setup. Run the following commands:
```bash
vagrant up
vagrant ssh
```
5. Once you are in the vagrant box, run the following commands:
```bash
cd laravel-admin-panel/admin-panel
composer install
```
4. Create a new `.env` file:
```bash
cp .env.example .env
```
5. Generate a new application key:
```bash
php artisan key:generate
```
5. Configure the database connection in the .env file with your database credentials:

```dotenv
APP_NAME=ADMIN-PANEL
APP_ENV=local
APP_KEY={app key generated by previous command}
APP_DEBUG=true
APP_URL=http://127.0.0.1
APP_HOST=localhost
APP_PORT=8000
LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST={configured in Homestead.yaml file}
DB_PORT=3306
DB_DATABASE=homestead
DB_USERNAME=homestead
DB_PASSWORD=secret
```
6. Run the database migrations:
```bash
php artisan migrate
```
7. Seed the database with the default data:
```bash
php artisan db:seed
```
8. Start the local development server:
```bash
php artisan serve
```
9. Open a new terminal at the root of your project and run the following command to install and run the frontend:
```bash
npm i && npm run dev
```
10. Visit the application in your browser at the configured URL (e.g. http://localhost:5173).

