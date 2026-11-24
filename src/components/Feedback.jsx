
import { useState, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

// ================= CONSTANTS =================

const initialFormData = {
  name: "",
  company: "",
  contact: "",
  role: "",
  decision: "",
  topics: [],
  nextStep: "",
  timeline: "",
  comments: "",
  consent: false,
  metBy: "",
  date: "",
};

const roles = [
  "CXO / Plant head",
  "Operations / Production",
  "Engineering / Maintenance",
  "IT / Digital / Automation",
  "Procurement / Supply",
  "Consultant / Other",
];

const decisions = [
  "I make the final decision",
  "I strongly influence the decision",
  "I give technical or operational input",
  "I am exploring for now",
];

const topics = [
  {
    title: "AI-Driven Steel Plant Optimization",
    description:
      "AI-driven scheduling and execution intelligence, from melt shop to mill",
  },
  {
    title: "Virtual Twin of the Green Steel Plant",
    description:
      "Design it. Simulate it. Predict it. Before the first heat.",
  },
  {
    title: "Pit-to-Port-to-Plant Optimization",
    description: "Optimize the critical minerals supply chain",
  },
  {
    title: "Immersive Operations and Maintenance",
    description:
      "On Apple Vision Pro. Safer, smarter plant operations and maintenance.",
  },
];

const nextSteps = [
  "A workshop with my team",
  "A value assessment for my plant or project",
  "An in-depth call with your team",
  "Information by email only",
  "No action at present",
];

const timelines = [
  "Immediately",
  "3–6 months",
  "Beyond 6 months",
];

// ================= STYLES =================

const inputClass =
  "block w-full min-w-0 h-[53px] px-3 border border-[#c6d5df] rounded-md bg-white outline-none transition-all duration-200 focus:border-[#159de5] focus:ring-1 focus:ring-[#159de5]";

const sectionClass =
  "w-full min-w-0 bg-white border border-[#cedde7] p-5 sm:p-6 lg:p-8";

const radioClass =
  "w-[18px] h-[18px] shrink-0 accent-[#00699e]";

const radioLabel =
  "flex items-center gap-3 text-base lg:text-lg cursor-pointer leading-snug";

// ================= ANIMATIONS =================

const pageVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2 },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

// ================= MOTION SECTION =================

const MotionSection = memo(function MotionSection({
  children,
  className,
}) {
  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.08,
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
});

// ================= FEEDBACK FORM =================

const FeedbackForm = memo(function FeedbackForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTopic = (topic) => {
    setFormData((prev) => ({
      ...prev,
      topics: prev.topics.includes(topic)
        ? prev.topics.filter((item) => item !== topic)
        : [...prev.topics, topic],
    }));
  };

  // ================= FORM SUBMISSION =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    // At least one topic is required
    if (formData.topics.length === 0) {
      toast.error("Please select at least one topic.");
      document.getElementById("topics-section")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    if (!e.currentTarget.reportValidity()) return;

    setIsSubmitting(true);

    const loadingToast = toast.loading(
      "Submitting your feedback..."
    );

    try {
      // Temporary demo submission
      // Replace with actual API request later.

      console.log("Feedback Data:", formData);

      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );

      toast.dismiss(loadingToast);

      toast.success("Feedback submitted successfully!", {
        description: "Thank you for visiting our booth.",
      });

      setFormData({ ...initialFormData });

    } catch (error) {
      toast.dismiss(loadingToast);

      toast.error("Submission failed!", {
        description: "Please try again.",
      });

      console.error(error);

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[435px_minmax(0,1fr)] gap-10 xl:gap-[75px] mt-10 lg:mt-[74px] pb-16">

      {/* LEFT SIDE */}

      <motion.aside
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <div className="h-[5px] w-full bg-[#20a0ed] mb-7" />

        <h1 className="text-[42px] md:text-[50px] font-normal leading-tight mb-3">
          Your feedback
        </h1>

        <p className="text-xl md:text-[22px] leading-[1.27] font-light max-w-[390px]">
          Thank you for visiting our booth. Six quick
          questions help us follow up on what is useful
          to you. It takes about two minutes.
        </p>
      </motion.aside>

      {/* RIGHT SIDE FORM */}

      <form
        onSubmit={handleSubmit}
        className="w-full min-w-0 flex flex-col gap-8"
      >

        {/* 1 ABOUT YOU */}

        <MotionSection className={sectionClass}>
          <h2 className="text-xl md:text-2xl font-bold mb-6">
            1 About you
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">

            <div>
              <label className="block text-lg font-semibold mb-1">
                Name *
              </label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) =>
                  updateField("name", e.target.value)
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-1">
                Company *
              </label>
              <input
                required
                type="text"
                value={formData.company}
                onChange={(e) =>
                  updateField("company", e.target.value)
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-1">
                Email or phone *
              </label>
              <input
                required
                type="text"
                value={formData.contact}
                onChange={(e) =>
                  updateField("contact", e.target.value)
                }
                className={inputClass}
              />
            </div>

          </div>
        </MotionSection>

        {/* 2 ROLE AND DECISIONS */}

        <MotionSection className={sectionClass}>
          <h2 className="text-xl md:text-2xl font-bold mb-6">
            2 Your role and your part in decisions *
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">

            <div>
              <h3 className="text-xl mb-5">
                My role
              </h3>

              <div className="flex flex-col gap-3">
                {roles.map((role) => (
                  <label key={role} className={radioLabel}>
                    <input
                      required
                      type="radio"
                      name="role"
                      value={role}
                      checked={formData.role === role}
                      onChange={() =>
                        updateField("role", role)
                      }
                      className={radioClass}
                    />
                    <span>{role}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl mb-5">
                My part in technology decisions
              </h3>

              <div className="flex flex-col gap-3">
                {decisions.map((decision) => (
                  <label key={decision} className={radioLabel}>
                    <input
                      required
                      type="radio"
                      name="decision"
                      value={decision}
                      checked={formData.decision === decision}
                      onChange={() =>
                        updateField("decision", decision)
                      }
                      className={radioClass}
                    />
                    <span>{decision}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>
        </MotionSection>

        {/* 3 TOPICS */}

        <MotionSection
          className={sectionClass}
        >
          <div id="topics-section">
            <h2 className="text-xl md:text-2xl font-bold mb-3">
              3 Which topics interested you most? *
            </h2>

            <p className="text-base mb-5">
              Select at least one topic.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {topics.map((topic) => (
                <motion.label
                  key={topic.title}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#f5f8fa] p-3 flex gap-3 items-start cursor-pointer hover:bg-[#edf5fa] transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={formData.topics.includes(topic.title)}
                    onChange={() => handleTopic(topic.title)}
                    className="mt-1 w-[17px] h-[17px] shrink-0 accent-[#00699e]"
                  />

                  <div className="min-w-0">
                    <h3 className="font-semibold text-base mb-1">
                      {topic.title}
                    </h3>
                    <p className="text-sm leading-snug">
                      {topic.description}
                    </p>
                  </div>
                </motion.label>
              ))}

            </div>
          </div>
        </MotionSection>

        {/* 4 NEXT STEP */}

        <MotionSection className={sectionClass}>
          <h2 className="text-xl md:text-2xl font-bold mb-5">
            4 What would you like as a next step? *
          </h2>

          <div className="flex flex-col gap-3">
            {nextSteps.map((step) => (
              <label key={step} className={radioLabel}>
                <input
                  required
                  type="radio"
                  name="nextStep"
                  value={step}
                  checked={formData.nextStep === step}
                  onChange={() =>
                    updateField("nextStep", step)
                  }
                  className={radioClass}
                />
                <span>{step}</span>
              </label>
            ))}
          </div>
        </MotionSection>

        {/* 5 TIMELINE */}

        <MotionSection className={sectionClass}>
          <h2 className="text-xl md:text-2xl font-bold mb-5">
            5 How soon would you want to take next steps? *
          </h2>

          <div className="flex flex-col gap-3">
            {timelines.map((time) => (
              <label key={time} className={radioLabel}>
                <input
                  required
                  type="radio"
                  name="timeline"
                  value={time}
                  checked={formData.timeline === time}
                  onChange={() =>
                    updateField("timeline", time)
                  }
                  className={radioClass}
                />
                <span>{time}</span>
              </label>
            ))}
          </div>
        </MotionSection>

        {/* 6 COMMENTS */}

        <MotionSection className={sectionClass}>
          <h2 className="text-xl md:text-2xl font-bold mb-5">
            6 Anything else you would like us to know about your need? *
          </h2>

          <textarea
            required
            rows={3}
            value={formData.comments}
            onChange={(e) =>
              updateField("comments", e.target.value)
            }
            className="block w-full border border-[#c6d5df] rounded-md p-3 outline-none focus:border-[#159de5] resize-y"
          />
        </MotionSection>

        {/* CONSENT */}

        <label className="flex items-start gap-2 text-sm cursor-pointer">
          <input
            required
            type="checkbox"
            checked={formData.consent}
            onChange={(e) =>
              updateField("consent", e.target.checked)
            }
            className="mt-1 shrink-0 accent-[#00699e]"
          />

          <span>
            I agree that Dassault Systèmes may contact me about
            the topics I selected above. *
          </span>
        </label>

        {/* TEAM DETAILS */}

        <div className="w-full space-y-4">
          <h3 className="font-semibold">
            For the Dassault Systèmes team:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <label className="block font-semibold text-sm mb-1">
                Met by *
              </label>
              <input
                required
                type="text"
                value={formData.metBy}
                onChange={(e) =>
                  updateField("metBy", e.target.value)
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className="block font-semibold text-sm mb-1">
                Date *
              </label>
              <input
                required
                type="date"
                value={formData.date}
                onChange={(e) =>
                  updateField("date", e.target.value)
                }
                className={inputClass}
              />
            </div>

          </div>
        </div>

        {/* SUBMIT */}

        <div>
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={!isSubmitting ? { scale: 1.02 } : {}}
            whileTap={!isSubmitting ? { scale: 0.97 } : {}}
            className="inline-flex items-center justify-center gap-2 bg-[#005b89] hover:bg-[#003f63] disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-3 font-semibold transition-colors"
          >
            {isSubmitting ? (
              <>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8,
                    ease: "linear",
                  }}
                  className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
                />
                Submitting...
              </>
            ) : (
              "Submit feedback"
            )}
          </motion.button>
        </div>

      </form>
    </div>
  );
});

// ================= BROCHURES =================

const Brochures = memo(function Brochures() {
  const brochures = [
    {
      title: "DELMIA Supply Chain Planning & Optimization",
      file: "/brochures/delmia.pdf",
    },
    {
      title: "GEOVIA Minex",
      file: "/brochures/geovia-minex.pdf",
    },
  ];

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="pt-9 pb-16"
    >
      <h1 className="text-[26px] md:text-[30px] font-normal mb-4">
        Brochures
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {brochures.map((brochure) => (
          <motion.div
            key={brochure.title}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="bg-white border border-[#d7e1e9] border-t-2 border-t-[#20a0ed] p-[14px]"
          >
            <h2 className="text-[14px] font-bold mb-5">
              {brochure.title}
            </h2>

            <a
              href={brochure.file}
              download
              className="inline-flex items-center justify-center bg-[#005b89] hover:bg-[#00466c] text-white text-xs font-semibold px-5 h-[29px] transition-colors"
            >
              Download PDF
            </a>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
});

// ================= MAIN COMPONENT =================

export default function Feedback() {
  const [activeTab, setActiveTab] = useState("feedback");

  return (
    <main className="w-full font-ds min-h-screen bg-[#f5f8fa] text-[#002943]">

      <div className="w-[calc(100%-32px)] sm:w-[calc(100%-64px)] lg:w-[calc(100%-96px)] max-w-[1530px] mx-auto">

        {/* NAVIGATION */}

        <nav className="flex gap-8 border-b border-[#cbdbe5]">

          {[
            { id: "feedback", label: "Your feedback" },
            { id: "brochures", label: "Brochures" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`relative py-5 text-lg md:text-xl font-semibold transition-colors duration-200 ${
                activeTab === tab.id
                  ? "text-[#002943]"
                  : "text-[#002943]/60 hover:text-[#002943]"
              }`}
            >
              {tab.label}

              {activeTab === tab.id && (
                <motion.span
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#00699a]"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 35,
                  }}
                />
              )}
            </button>
          ))}

        </nav>

        {/* TAB CONTENT */}

        <AnimatePresence mode="wait" initial={false}>
          {activeTab === "feedback" ? (
            <motion.div
              key="feedback"
              variants={pageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <FeedbackForm />
            </motion.div>
          ) : (
            <motion.div
              key="brochures"
              variants={pageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Brochures />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}
