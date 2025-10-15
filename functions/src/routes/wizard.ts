import { Router, type Request, type Response } from "express";
import { requireAuth, type AuthedRequest } from "../utils/auth";

export const wizardRouter = Router();

interface StartWizardRequestBody {
    text: string;
}

function generateWizardId(): string {
    // Simple random ID for MVP (replace with DB push-id later)
    return Math.random().toString(36).slice(2, 10);
}

wizardRouter.post("/start", requireAuth, (req: AuthedRequest & Request, res: Response) => {
    const body = req.body as Partial<StartWizardRequestBody> | undefined;
    const text = typeof body?.text === "string" ? body.text.trim() : "";
    if (!text) {
        res.status(400).json({ error: "text is required" });
        return;
    }

    const wizardId = generateWizardId();
    res.json({ wizardId });
});
