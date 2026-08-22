const { generateAIResponse } = require("../services/groqService");
const { parseCleanJSON } = require("../utils/jsonParser");

const getCompanyDetails = async (req, res) => {
    try {
        const { company } = req.params;

        if (!company) {
            return res.status(400).json({
                success: false,
                message: "Company name is required.",
            });
        }

        const prompt = `
You are a professional career assistant.

Return ONLY valid JSON.

Do not use markdown.

Generate realistic information about the following company.

Company:
${company}

Return exactly in this format:

{
  "company": "",
  "tagline": "",
  "industry": "",
  "headquarters": "",
  "founded": "",
  "employees": "",
  "website": "",
  "culture": "",
  "techStack": [],
  "hiringProcess": [],
  "skillsRequired": [],
  "interviewDifficulty": "",
  "resumeTips": "",
  "preparationTips": "",
  "salaryRange": "",
  "careerPage": ""
}
`;

        const textResponse = await generateAIResponse(prompt, "You are a professional career assistant.");

        const companySchema = {
            company: "",
            tagline: "",
            industry: "",
            headquarters: "",
            founded: "",
            employees: "",
            website: "",
            culture: "",
            techStack: [],
            hiringProcess: [],
            skillsRequired: [],
            interviewDifficulty: "",
            resumeTips: "",
            preparationTips: "",
            salaryRange: "",
            careerPage: ""
        };

        let companyInfo;
        try {
            companyInfo = parseCleanJSON(textResponse, companySchema);
        } catch (err) {
            console.error("Failed to parse company details JSON. Error:", err.message);
            console.error("Raw text response was:", JSON.stringify(textResponse));
            throw err;
        }

        // Add logo automatically using Clearbit
        companyInfo.logo = `https://logo.clearbit.com/${company.toLowerCase()}.com`;

        return res.status(200).json({
            success: true,
            data: companyInfo,
        });

    } catch (error) {
        console.error("Groq API Error in getCompanyDetails:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to load company information.",
        });
    }
};

module.exports = {
    getCompanyDetails,
};