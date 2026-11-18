import { MessageSquare, Shield, BookOpen, Users } from "lucide-react";
import AppStoreBadge from "@/components/AppStoreBadge";
import familybridgeLogo from "@/assets/familybridge-logo.png.asset.json";

const FamilyBridgeBanner = () => {
  return (
    <section className="py-8 md:py-10">
      <div className="container px-4">
        <div className="bg-gradient-to-r from-[#0d4a4a] via-[#0f5f5f] to-[#0d4a4a] rounded-xl border border-[#2a9d8f]/30 shadow-lg overflow-hidden max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-5 md:gap-8 p-5 md:p-7">

            {/* Logo */}
            <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-white/10 border border-[#2a9d8f]/40 flex items-center justify-center shadow-inner overflow-hidden">
              <img
                src={familybridgeLogo.url}
                alt="FamilyBridge logo"
                className="h-full w-full rounded-xl object-cover"
                width={80}
                height={80}
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Content + Features + Badge */}
            <div className="flex-1 flex flex-col gap-3 text-center md:text-left min-w-0">

              {/* Label + Title */}
              <div>
                <p className="text-[#2a9d8f] text-xs font-semibold uppercase tracking-widest mb-1">
                  New from Matt Brown
                </p>
                <h3 className="text-white font-serif text-xl md:text-2xl font-bold">
                  Family<span className="text-[#2a9d8f]">Bridge</span>
                  <span className="text-white/70 font-normal text-base md:text-lg"> — AI Support for Families</span>
                </h3>
                <p className="text-white/75 text-sm mt-1 leading-relaxed">
                  Not ready to call yet? Get real-time guidance on communication, enabling, and the right next step — built from 20+ years in the field.
                </p>
              </div>

              {/* Feature pills */}
              <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1.5">
                {[
                  { Icon: MessageSquare, label: "Communication guidance" },
                  { Icon: Shield,        label: "Boundary support" },
                  { Icon: BookOpen,      label: "Family education" },
                  { Icon: Users,         label: "Intervention prep" },
                ].map(({ Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 text-[#2a9d8f] flex-shrink-0" />
                    <span className="text-white/75 text-[11px]">{label}</span>
                  </div>
                ))}
              </div>

              {/* Badges */}
              <div className="flex justify-center md:justify-start">
                <AppStoreBadge height={40} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FamilyBridgeBanner;
