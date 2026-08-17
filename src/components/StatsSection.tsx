import React from 'react';

const StatsSection = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Years Experience", value: "5+" },
            { label: "Projects Completed", value: "850+" },
            { label: "Happy Clients", value: "650+" },
            { label: "Team Members", value: "30+" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { StatsSection };