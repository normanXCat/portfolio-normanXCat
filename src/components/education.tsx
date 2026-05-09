"use client";

import { motion } from "framer-motion";

type EducationData = {
  degree: string;
  period: string;
  specialization: string;
  school: string;
};

export function Education({ data }: { data: EducationData[] }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="mb-16"
    >
      <h2 className="text-2xl font-bold mb-8 text-foreground">Formation</h2>
      <div className="space-y-8">
        {data.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
            className="flex flex-col gap-1"
          >
            <div className="flex justify-between items-baseline gap-4">
              <h3 className="text-foreground font-bold text-lg font-source-code">
                {edu.degree}
              </h3>
              <span className="text-muted text-sm whitespace-nowrap">
                {edu.period}
              </span>
            </div>
            <p className="text-muted text-sm">{edu.specialization}</p>
            {edu.school && (
              <p className="text-muted text-xs italic">{edu.school}</p>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
