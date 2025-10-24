app.use(
  cors({
    origin: ["https://multivendor-frontend-1r86.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
