import { Router } from "express";

const router = Router();

router.use(express.json());

router.post("/contest", (req, res) => {});
router.get("/contest", (req, res) => {});

export default router;
