### Prerequisites
- Node.js and npm installed
- PostgreSQL

---

###  setup the database

```bash
npx prisma migrate dev --name init
```

### setup the env
**create a .env file in the root directory and the the following fileds note replace value with your actual vales**
- CSV_PATH=./data/users.csv
- DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/yourdbname"

###  Run the App
# 1. Clone the repository
```bash
git clone https://github.com/khan1104/klep-global.git
```

# 2. Navigate to the project directory
```bash
cd kelp_global
```

# 3. Install the dependencies
```bash
npm install
```

# 4. Start the  server
```bash
node main.js
```

