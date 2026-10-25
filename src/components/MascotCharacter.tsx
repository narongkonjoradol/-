import React from 'react';
import { motion } from 'motion/react';
import { Mascot } from '../types';

interface MascotProps {
  mascot: Mascot;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  action?: 'idle' | 'wave' | 'celebrate' | 'working';
  showSpeechBubble?: boolean;
  customSpeech?: string;
  className?: string;
}

export const MascotCharacter: React.FC<MascotProps> = ({
  mascot,
  size = 'md',
  action = 'idle',
  showSpeechBubble = false,
  customSpeech,
  className = ''
}) => {
  const sizeMap = {
    sm: 'w-24 h-24',
    md: 'w-36 h-36',
    lg: 'w-52 h-52',
    xl: 'w-72 h-72'
  };

  const getMascotSvg = (type: Mascot['avatarType']) => {
    switch (type) {
      case 'gear':
        // ช่างยนต์: น้องเกียร์ หมีช่างยนต์จอมพลัง
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
            {/* Background Glow */}
            <circle cx="100" cy="100" r="85" fill="#FEE2E2" opacity="0.6" />
            {/* Bear Ears */}
            <circle cx="60" cy="55" r="22" fill="#B45309" />
            <circle cx="60" cy="55" r="13" fill="#FDE68A" />
            <circle cx="140" cy="55" r="22" fill="#B45309" />
            <circle cx="140" cy="55" r="13" fill="#FDE68A" />
            
            {/* Bear Head */}
            <ellipse cx="100" cy="105" rx="55" ry="50" fill="#D97706" />
            {/* Muzzle */}
            <ellipse cx="100" cy="120" rx="25" ry="18" fill="#FEF3C7" />
            {/* Nose */}
            <polygon points="100,110 93,118 107,118" fill="#451A03" rx="2" />
            {/* Smile */}
            <path d="M 94 122 Q 100 130 106 122" stroke="#451A03" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* Cheeks */}
            <circle cx="68" cy="115" r="7" fill="#F87171" opacity="0.6" />
            <circle cx="132" cy="115" r="7" fill="#F87171" opacity="0.6" />
            {/* Eyes */}
            <circle cx="80" cy="95" r="6" fill="#1F2937" />
            <circle cx="78" cy="93" r="2" fill="#FFFFFF" />
            <circle cx="120" cy="95" r="6" fill="#1F2937" />
            <circle cx="118" cy="93" r="2" fill="#FFFFFF" />

            {/* Mechanic Cap */}
            <path d="M 50 78 Q 100 45 150 78 L 155 70 Q 100 35 45 70 Z" fill="#1E40AF" />
            <path d="M 45 70 Q 100 30 155 70 Q 100 60 45 70 Z" fill="#2563EB" />
            {/* Cap Visor */}
            <path d="M 40 76 Q 100 86 160 76 Q 100 70 40 76 Z" fill="#1E3A8A" />
            {/* Goggles on Hat */}
            <rect x="70" y="52" width="25" height="15" rx="5" fill="#374151" stroke="#E5E7EB" strokeWidth="2" />
            <rect x="105" y="52" width="25" height="15" rx="5" fill="#374151" stroke="#E5E7EB" strokeWidth="2" />
            <line x1="95" y1="60" x2="105" y2="60" stroke="#E5E7EB" strokeWidth="3" />
            <circle cx="82" cy="60" r="5" fill="#60A5FA" opacity="0.7" />
            <circle cx="117" cy="60" r="5" fill="#60A5FA" opacity="0.7" />

            {/* Body & Mechanic Suit */}
            <path d="M 65 145 Q 100 135 135 145 L 145 195 L 55 195 Z" fill="#1E40AF" />
            <path d="M 85 145 L 100 170 L 115 145 Z" fill="#FEF3C7" />
            {/* Wrench held by hand */}
            <motion.g
              animate={{ rotate: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              style={{ transformOrigin: '150px 150px' }}
            >
              {/* Hand */}
              <circle cx="150" cy="150" r="14" fill="#D97706" />
              {/* Silver Wrench */}
              <path d="M 140 130 L 175 95 C 180 90 185 95 180 100 L 155 125 Z" fill="#9CA3AF" />
              <circle cx="178" cy="98" r="10" fill="#9CA3AF" />
              <circle cx="178" cy="98" r="5" fill="#FEE2E2" />
            </motion.g>
            {/* Gear Badge */}
            <circle cx="100" cy="175" r="8" fill="#F59E0B" />
            <path d="M 100 164 L 100 186 M 89 175 L 111 175" stroke="#D97706" strokeWidth="3" />
          </svg>
        );

      case 'spark':
        // ช่างไฟฟ้า: น้องสปาร์ค กระรอกสายฟ้า
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
            {/* Background Glow */}
            <circle cx="100" cy="100" r="85" fill="#FEF3C7" opacity="0.6" />
            
            {/* Big Lightning Squirrel Tail */}
            <motion.path
              d="M 140 160 Q 185 130 180 80 Q 175 40 145 35 Q 165 70 140 100 Z"
              fill="#F59E0B"
              stroke="#D97706"
              strokeWidth="2"
              animate={{ rotate: [0, 8, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              style={{ transformOrigin: '140px 160px' }}
            />
            {/* Tail Sparks */}
            <polygon points="175,45 165,65 178,63 168,85" fill="#FDE047" />

            {/* Ears with Lightning Tip */}
            <polygon points="60,80 45,30 80,60" fill="#D97706" />
            <polygon points="60,75 52,42 75,62" fill="#FDE68A" />
            <polygon points="140,80 155,30 120,60" fill="#D97706" />
            <polygon points="140,75 148,42 125,62" fill="#FDE68A" />

            {/* Face */}
            <ellipse cx="100" cy="105" rx="50" ry="45" fill="#F59E0B" />
            <ellipse cx="100" cy="120" rx="30" ry="25" fill="#FFFBEB" />
            {/* Nose */}
            <circle cx="100" cy="112" r="5" fill="#78350F" />
            {/* Cute Buck Teeth & Smile */}
            <path d="M 94 117 Q 100 125 106 117" stroke="#78350F" strokeWidth="2.5" fill="none" />
            <rect x="97" y="119" width="6" height="6" rx="1" fill="#FFFFFF" stroke="#78350F" strokeWidth="1" />
            {/* Cheeks */}
            <circle cx="70" cy="118" r="8" fill="#F87171" opacity="0.6" />
            <circle cx="130" cy="118" r="8" fill="#F87171" opacity="0.6" />
            {/* Sparkling Eyes */}
            <circle cx="78" cy="96" r="7" fill="#1F2937" />
            <circle cx="76" cy="93" r="2.5" fill="#FFFFFF" />
            <polygon points="82,92 84,95 81,95" fill="#FDE047" />
            <circle cx="122" cy="96" r="7" fill="#1F2937" />
            <circle cx="120" cy="93" r="2.5" fill="#FFFFFF" />
            <polygon points="126,92 128,95 125,95" fill="#FDE047" />

            {/* Safety Helmet */}
            <path d="M 58 75 Q 100 45 142 75 L 146 70 Q 100 35 54 70 Z" fill="#FBBF24" />
            <path d="M 56 68 Q 100 35 144 68 Z" fill="#F59E0B" />
            <polygon points="100,48 95,58 102,57 96,68 108,55 101,55" fill="#EF4444" />

            {/* Body */}
            <path d="M 68 145 Q 100 135 132 145 L 140 195 L 60 195 Z" fill="#D97706" />
            <ellipse cx="100" cy="170" rx="20" ry="22" fill="#FFFBEB" />

            {/* Digital Multimeter */}
            <motion.g
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <rect x="130" y="135" width="25" height="38" rx="4" fill="#DC2626" stroke="#B91C1C" strokeWidth="2" />
              <rect x="135" y="140" width="15" height="12" rx="2" fill="#D1FAE5" />
              <text x="137" y="149" fontSize="8" fontFamily="monospace" fill="#065F46" fontWeight="bold">220V</text>
              <circle cx="142" cy="160" r="5" fill="#374151" />
              {/* Test Leads */}
              <path d="M 135 170 Q 120 185 105 180" stroke="#EF4444" strokeWidth="2" fill="none" />
              <path d="M 148 170 Q 160 185 165 175" stroke="#1F2937" strokeWidth="2" fill="none" />
            </motion.g>
          </svg>
        );

      case 'megabot':
        // เมคคาทรอนิกส์: น้องเมก้าบอท หุ่นยนต์จิ๋ว AI
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
            {/* Background Glow */}
            <circle cx="100" cy="100" r="85" fill="#DBEAFE" opacity="0.6" />

            {/* Floating Antenna with Glowing Orb */}
            <line x1="100" y1="45" x2="100" y2="25" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" />
            <motion.circle
              cx="100"
              cy="20"
              r="8"
              fill="#06B6D4"
              animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
            {/* Signal waves */}
            <path d="M 88 15 Q 100 8 112 15" stroke="#67E8F9" strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* Robot Head Frame */}
            <rect x="52" y="48" width="96" height="75" rx="24" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="3" />
            {/* Screen Face */}
            <rect x="62" y="58" width="76" height="55" rx="14" fill="#0F172A" />
            
            {/* Digital Eyes (LED Matrix) */}
            <motion.g
              animate={{ scaleY: [1, 1, 0.1, 1] }}
              transition={{ repeat: Infinity, duration: 3, times: [0, 0.85, 0.9, 1] }}
              style={{ transformOrigin: '100px 80px' }}
            >
              <ellipse cx="80" cy="80" rx="9" ry="11" fill="#38BDF8" />
              <ellipse cx="120" cy="80" rx="9" ry="11" fill="#38BDF8" />
              <circle cx="83" cy="77" r="3" fill="#FFFFFF" />
              <circle cx="123" cy="77" r="3" fill="#FFFFFF" />
            </motion.g>

            {/* Digital LED Smile */}
            <path d="M 88 97 Q 100 106 112 97" stroke="#38BDF8" strokeWidth="3.5" fill="none" strokeLinecap="round" />

            {/* Ear Bolts/Gears */}
            <circle cx="48" cy="85" r="8" fill="#64748B" stroke="#334155" strokeWidth="2" />
            <circle cx="152" cy="85" r="8" fill="#64748B" stroke="#334155" strokeWidth="2" />

            {/* Robotic Neck */}
            <rect x="90" y="123" width="20" height="10" rx="2" fill="#64748B" />

            {/* Robot Body */}
            <rect x="60" y="133" width="80" height="58" rx="16" fill="#2563EB" stroke="#1D4ED8" strokeWidth="2.5" />
            {/* Chest Gauge & Core Reactor */}
            <circle cx="100" cy="160" r="14" fill="#0F172A" />
            <motion.circle
              cx="100"
              cy="160"
              r="8"
              fill="#06B6D4"
              animate={{ scale: [0.8, 1.1, 0.8] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            {/* Robotic Claw Arm */}
            <motion.g
              animate={{ rotate: [-10, 15, -10] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              style={{ transformOrigin: '140px 145px' }}
            >
              <line x1="140" y1="145" x2="165" y2="135" stroke="#64748B" strokeWidth="6" strokeLinecap="round" />
              <line x1="165" y1="135" x2="175" y2="150" stroke="#64748B" strokeWidth="5" strokeLinecap="round" />
              {/* Mechanical Claw */}
              <path d="M 172 152 Q 185 145 185 158" stroke="#F59E0B" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 172 152 Q 185 162 178 168" stroke="#F59E0B" strokeWidth="3" fill="none" strokeLinecap="round" />
            </motion.g>
          </svg>
        );

      case 'flammy':
        // ช่างเชื่อมโลหะ: น้องเฟลมมี่ มังกรน้อยสวมหน้ากากเชื่อม
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
            {/* Background Glow */}
            <circle cx="100" cy="100" r="85" fill="#FFEDD5" opacity="0.6" />

            {/* Dragon Horns */}
            <path d="M 65 75 Q 45 40 35 45 Q 55 60 70 70 Z" fill="#EA580C" />
            <path d="M 135 75 Q 155 40 165 45 Q 145 60 130 70 Z" fill="#EA580C" />

            {/* Dragon Head */}
            <ellipse cx="100" cy="105" rx="55" ry="48" fill="#F97316" />
            <ellipse cx="100" cy="122" rx="35" ry="25" fill="#FED7AA" />
            {/* Cute Snout & Smoke */}
            <circle cx="92" cy="116" r="3.5" fill="#9A3412" />
            <circle cx="108" cy="116" r="3.5" fill="#9A3412" />
            <path d="M 94 125 Q 100 132 106 125" stroke="#9A3412" strokeWidth="3" fill="none" />

            {/* Confident Eyes */}
            <circle cx="78" cy="98" r="7" fill="#1F2937" />
            <circle cx="76" cy="95" r="2.5" fill="#FFFFFF" />
            <circle cx="122" cy="98" r="7" fill="#1F2937" />
            <circle cx="120" cy="95" r="2.5" fill="#FFFFFF" />

            {/* Welding Mask pushed up / Flip Mask */}
            <rect x="55" y="48" width="90" height="42" rx="10" fill="#374151" stroke="#1F2937" strokeWidth="2.5" />
            {/* Auto-darkening Filter Lens */}
            <rect x="75" y="58" width="50" height="22" rx="4" fill="#047857" stroke="#34D399" strokeWidth="1.5" />
            <text x="82" y="73" fontSize="9" fill="#A7F3D0" fontWeight="bold" fontFamily="sans-serif">AUTO-SHADE</text>

            {/* Dragon Body in Heavy Welding Leather Apron */}
            <path d="M 65 148 Q 100 140 135 148 L 145 195 L 55 195 Z" fill="#7C2D12" />
            <path d="M 75 152 L 125 152 L 120 195 L 80 195 Z" fill="#C2410C" />

            {/* Welding Torch with Golden Sparks */}
            <motion.g
              animate={{ rotate: [0, 10, -5, 0] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              style={{ transformOrigin: '150px 150px' }}
            >
              <line x1="145" y1="150" x2="175" y2="125" stroke="#D97706" strokeWidth="6" strokeLinecap="round" />
              <polygon points="175,125 182,118 185,122" fill="#F59E0B" />
              {/* Animated Sparks */}
              <motion.g
                animate={{ opacity: [0, 1, 0], scale: [0.8, 1.4, 0.8] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
              >
                <circle cx="186" cy="115" r="3" fill="#FDE047" />
                <circle cx="192" cy="120" r="2" fill="#F97316" />
                <circle cx="180" cy="110" r="2.5" fill="#38BDF8" />
              </motion.g>
            </motion.g>
          </svg>
        );

      case 'cashy':
        // การบัญชี: น้องแคชชี่ แพนด้านักบัญชีทองคำ
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
            {/* Background Glow */}
            <circle cx="100" cy="100" r="85" fill="#D1FAE5" opacity="0.6" />

            {/* Panda Ears */}
            <circle cx="60" cy="55" r="20" fill="#1F2937" />
            <circle cx="140" cy="55" r="20" fill="#1F2937" />

            {/* Panda Face */}
            <ellipse cx="100" cy="105" rx="55" ry="50" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1" />

            {/* Black Eye Patches */}
            <ellipse cx="75" cy="98" rx="16" ry="14" fill="#1F2937" transform="rotate(-15 75 98)" />
            <ellipse cx="125" cy="98" rx="16" ry="14" fill="#1F2937" transform="rotate(15 125 98)" />

            {/* Sparkly Eyes */}
            <circle cx="76" cy="97" r="6" fill="#FFFFFF" />
            <circle cx="77" cy="98" r="3" fill="#10B981" />
            <circle cx="124" cy="97" r="6" fill="#FFFFFF" />
            <circle cx="123" cy="98" r="3" fill="#10B981" />

            {/* Smart Golden Glasses */}
            <circle cx="75" cy="98" r="18" fill="none" stroke="#F59E0B" strokeWidth="3.5" />
            <circle cx="125" cy="98" r="18" fill="none" stroke="#F59E0B" strokeWidth="3.5" />
            <line x1="93" y1="98" x2="107" y2="98" stroke="#F59E0B" strokeWidth="3" />

            {/* Cute Nose & Smile */}
            <ellipse cx="100" cy="116" rx="6" ry="4" fill="#1F2937" />
            <path d="M 95 122 Q 100 128 105 122" stroke="#1F2937" strokeWidth="2.5" fill="none" />
            <circle cx="60" cy="120" r="6" fill="#F472B6" opacity="0.5" />
            <circle cx="140" cy="120" r="6" fill="#F472B6" opacity="0.5" />

            {/* Body & Business Suit */}
            <path d="M 65 150 Q 100 142 135 150 L 145 195 L 55 195 Z" fill="#065F46" />
            {/* White Collar & Tie */}
            <polygon points="100,150 90,165 110,165" fill="#FFFFFF" />
            <polygon points="100,165 96,188 104,188" fill="#F59E0B" />

            {/* Gold Calculator Tablet */}
            <motion.g
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <rect x="130" y="125" width="34" height="48" rx="6" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
              <rect x="135" y="130" width="24" height="12" rx="2" fill="#ECFDF5" />
              <text x="138" y="140" fontSize="8" fontFamily="monospace" fill="#047857" fontWeight="bold">9,999฿</text>
              {/* Calc Buttons */}
              <circle cx="140" cy="150" r="2.5" fill="#FEF3C7" />
              <circle cx="148" cy="150" r="2.5" fill="#FEF3C7" />
              <circle cx="156" cy="150" r="2.5" fill="#FEF3C7" />
              <circle cx="140" cy="160" r="2.5" fill="#FEF3C7" />
              <circle cx="148" cy="160" r="2.5" fill="#FEF3C7" />
              <circle cx="156" cy="160" r="2.5" fill="#10B981" />
            </motion.g>
          </svg>
        );

      case 'hospy':
        // การโรงแรม: น้องฮอสปี้ เพนกวินบัตเลอร์ 5 ดาว
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
            {/* Background Glow */}
            <circle cx="100" cy="100" r="85" fill="#EDE9FE" opacity="0.6" />

            {/* Penguin Head */}
            <ellipse cx="100" cy="95" rx="50" ry="46" fill="#1E1B4B" />
            <ellipse cx="100" cy="105" rx="36" ry="34" fill="#FFFFFF" />

            {/* Gentle Eyes */}
            <ellipse cx="82" cy="95" rx="6" ry="8" fill="#1E1B4B" />
            <circle cx="84" cy="92" r="2.5" fill="#FFFFFF" />
            <ellipse cx="118" cy="95" rx="6" ry="8" fill="#1E1B4B" />
            <circle cx="116" cy="92" r="2.5" fill="#FFFFFF" />

            {/* Golden Beak */}
            <polygon points="100,100 88,110 112,110" fill="#F59E0B" />
            {/* Cheeks */}
            <circle cx="70" cy="108" r="6" fill="#F472B6" opacity="0.6" />
            <circle cx="130" cy="108" r="6" fill="#F472B6" opacity="0.6" />

            {/* Butler Bowtie */}
            <polygon points="100,135 88,128 88,142" fill="#8B5CF6" />
            <polygon points="100,135 112,128 112,142" fill="#8B5CF6" />
            <circle cx="100" cy="135" r="3.5" fill="#6D28D9" />

            {/* Tuxedo Body */}
            <path d="M 62 140 Q 100 135 138 140 L 145 195 L 55 195 Z" fill="#1E1B4B" />
            <path d="M 80 140 L 100 175 L 120 140 Z" fill="#FFFFFF" />
            <circle cx="100" cy="180" r="2" fill="#8B5CF6" />
            <circle cx="100" cy="188" r="2" fill="#8B5CF6" />

            {/* Silver Serving Tray with Tropical Bangsaen Mocktail */}
            <motion.g
              animate={{ y: [0, -3, 0], rotate: [0, 2, 0] }}
              transition={{ repeat: Infinity, duration: 2.2 }}
              style={{ transformOrigin: '145px 145px' }}
            >
              {/* Hand */}
              <ellipse cx="140" cy="148" rx="8" ry="12" fill="#1E1B4B" />
              {/* Silver Tray */}
              <ellipse cx="155" cy="135" rx="30" ry="7" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
              {/* Fancy Cocktail Glass */}
              <polygon points="155,128 147,112 163,112" fill="#38BDF8" opacity="0.8" />
              <line x1="155" y1="128" x2="155" y2="135" stroke="#94A3B8" strokeWidth="2" />
              <ellipse cx="155" cy="135" rx="5" ry="2" fill="#94A3B8" />
              {/* Umbrella */}
              <path d="M 148 110 Q 155 102 162 110 Z" fill="#EC4899" />
              <line x1="155" y1="104" x2="155" y2="114" stroke="#F59E0B" strokeWidth="1.5" />
            </motion.g>
          </svg>
        );

      case 'volty':
        // ยานยนต์ไฟฟ้า (EV): น้องโวลต์ตี้ จิ้งจอกสายฟ้าพลังงานสะอาด
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
            {/* Background Glow */}
            <circle cx="100" cy="100" r="85" fill="#D1FAE5" opacity="0.6" />

            {/* EV Plug Tail */}
            <motion.g
              animate={{ rotate: [0, 12, -8, 0] }}
              transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
              style={{ transformOrigin: '140px 160px' }}
            >
              <path d="M 135 155 Q 185 125 175 75" stroke="#10B981" strokeWidth="14" fill="none" strokeLinecap="round" />
              {/* Plug Head on tail tip */}
              <rect x="162" y="60" width="22" height="18" rx="4" fill="#047857" />
              <line x1="168" y1="60" x2="168" y2="52" stroke="#FDE047" strokeWidth="3" strokeLinecap="round" />
              <line x1="178" y1="60" x2="178" y2="52" stroke="#FDE047" strokeWidth="3" strokeLinecap="round" />
            </motion.g>

            {/* Fox Ears */}
            <polygon points="55,80 40,30 80,60" fill="#059669" />
            <polygon points="56,76 48,42 75,62" fill="#A7F3D0" />
            <polygon points="145,80 160,30 120,60" fill="#059669" />
            <polygon points="144,76 152,42 125,62" fill="#A7F3D0" />

            {/* Fox Face */}
            <ellipse cx="100" cy="105" rx="52" ry="46" fill="#10B981" />
            <ellipse cx="100" cy="120" rx="32" ry="24" fill="#FFFFFF" />
            {/* Nose */}
            <polygon points="100,114 94,120 106,120" fill="#064E3B" rx="1" />
            <path d="M 95 123 Q 100 128 105 123" stroke="#064E3B" strokeWidth="2.5" fill="none" />

            {/* Futuristic Cyber Visor Glass */}
            <rect x="58" y="85" width="84" height="22" rx="8" fill="#064E3B" stroke="#34D399" strokeWidth="2" />
            <motion.rect
              x="62"
              y="88"
              width="76"
              height="16"
              rx="6"
              fill="#059669"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
            />
            {/* Battery Indicator on Visor */}
            <rect x="68" y="92" width="22" height="9" rx="2" fill="#065F46" stroke="#6EE7B7" strokeWidth="1" />
            <rect x="70" y="94" width="16" height="5" rx="1" fill="#34D399" />
            <text x="96" y="100" fontSize="8" fill="#A7F3D0" fontWeight="bold" fontFamily="monospace">100% EV</text>

            {/* Cheeks */}
            <circle cx="68" cy="122" r="6" fill="#6EE7B7" opacity="0.6" />
            <circle cx="132" cy="122" r="6" fill="#6EE7B7" opacity="0.6" />

            {/* Body */}
            <path d="M 65 145 Q 100 138 135 145 L 142 195 L 58 195 Z" fill="#047857" />
            <ellipse cx="100" cy="170" rx="18" ry="20" fill="#FFFFFF" />
            {/* EV Fast Charger Pistol in Hand */}
            <motion.g
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <rect x="130" y="135" width="26" height="34" rx="6" fill="#1F2937" stroke="#10B981" strokeWidth="2" />
              <circle cx="143" cy="148" r="6" fill="#10B981" />
              <text x="138" y="152" fontSize="7" fill="#FFFFFF" fontWeight="bold">⚡</text>
            </motion.g>
          </svg>
        );

      case 'cyber':
        // เทคนิคคอมพิวเตอร์: น้องไซเบอร์ แมวโปรแกรมเมอร์
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
            {/* Background Glow */}
            <circle cx="100" cy="100" r="85" fill="#CFFAFE" opacity="0.6" />

            {/* Cat Ears */}
            <polygon points="55,75 42,35 80,55" fill="#0891B2" />
            <polygon points="56,72 48,44 75,58" fill="#A5F3FC" />
            <polygon points="145,75 158,35 120,55" fill="#0891B2" />
            <polygon points="144,72 152,44 125,58" fill="#A5F3FC" />

            {/* Gaming Headset Band & RGB Ear Cups */}
            <path d="M 45 75 Q 100 25 155 75" stroke="#374151" strokeWidth="8" fill="none" strokeLinecap="round" />
            <ellipse cx="44" cy="85" rx="10" ry="16" fill="#06B6D4" stroke="#0891B2" strokeWidth="2" />
            <ellipse cx="156" cy="85" rx="10" ry="16" fill="#06B6D4" stroke="#0891B2" strokeWidth="2" />
            {/* Mic */}
            <path d="M 44 95 Q 60 115 80 112" stroke="#374151" strokeWidth="3" fill="none" />
            <circle cx="80" cy="112" r="3.5" fill="#EC4899" />

            {/* Cat Face */}
            <ellipse cx="100" cy="105" rx="52" ry="46" fill="#06B6D4" />
            <ellipse cx="100" cy="120" rx="30" ry="22" fill="#ECFEFF" />

            {/* Nose & Whiskers */}
            <polygon points="100,114 95,119 105,119" fill="#0E7490" rx="1" />
            <path d="M 96 122 Q 100 126 104 122" stroke="#0E7490" strokeWidth="2" fill="none" />
            {/* Whiskers */}
            <line x1="60" y1="116" x2="40" y2="114" stroke="#0891B2" strokeWidth="2" />
            <line x1="60" y1="122" x2="40" y2="124" stroke="#0891B2" strokeWidth="2" />
            <line x1="140" y1="116" x2="160" y2="114" stroke="#0891B2" strokeWidth="2" />
            <line x1="140" y1="122" x2="160" y2="124" stroke="#0891B2" strokeWidth="2" />

            {/* Cool Blue-Light Glasses with Code Bracket Reflections */}
            <rect x="62" y="86" width="32" height="22" rx="6" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
            <rect x="106" y="86" width="32" height="22" rx="6" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
            <line x1="94" y1="96" x2="106" y2="96" stroke="#38BDF8" strokeWidth="2" />
            {/* Brackets Reflection */}
            <text x="70" y="102" fontSize="12" fill="#22D3EE" fontWeight="bold" fontFamily="monospace">&lt;/&gt;</text>
            <text x="114" y="102" fontSize="12" fill="#22D3EE" fontWeight="bold" fontFamily="monospace">&#123; &#125;</text>

            {/* Body */}
            <path d="M 65 148 Q 100 140 135 148 L 142 195 L 58 195 Z" fill="#0891B2" />
            
            {/* Laptop / Mechanical Keyboard Typing */}
            <motion.g
              animate={{ y: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            >
              <polygon points="72,170 128,170 138,192 62,192" fill="#1E293B" stroke="#0E7490" strokeWidth="1.5" />
              <rect x="80" y="174" width="40" height="12" rx="2" fill="#0F172A" />
              {/* RGB glow keyboard */}
              <circle cx="85" cy="180" r="1.5" fill="#38BDF8" />
              <circle cx="92" cy="180" r="1.5" fill="#A855F7" />
              <circle cx="100" cy="180" r="1.5" fill="#EC4899" />
              <circle cx="108" cy="180" r="1.5" fill="#22C55E" />
              <circle cx="115" cy="180" r="1.5" fill="#EAB308" />
            </motion.g>
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Speech Bubble */}
      {(showSpeechBubble || customSpeech) && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-3 max-w-[280px] bg-white border-2 border-slate-200 shadow-lg rounded-2xl p-3 text-center relative z-20"
          style={{ borderColor: mascot.accentColor }}
        >
          <p className="text-xs font-semibold text-slate-700 leading-relaxed">
            {customSpeech || mascot.catchphrase}
          </p>
          {/* Arrow */}
          <div
            className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r-2 border-b-2 border-slate-200 rotate-45"
            style={{ borderColor: mascot.accentColor }}
          />
        </motion.div>
      )}

      {/* Animated Character Avatar */}
      <motion.div
        className={`${sizeMap[size]} relative flex items-center justify-center cursor-pointer`}
        animate={
          action === 'wave'
            ? { rotate: [0, -5, 5, -5, 0], y: [0, -6, 0] }
            : action === 'celebrate'
            ? { y: [0, -12, 0], scale: [1, 1.08, 1] }
            : action === 'working'
            ? { rotate: [0, 3, -3, 0] }
            : { y: [0, -6, 0] }
        }
        transition={{
          repeat: Infinity,
          duration: action === 'celebrate' ? 1.4 : 3,
          ease: 'easeInOut'
        }}
        whileHover={{ scale: 1.1, rotate: [0, -4, 4, 0] }}
        whileTap={{ scale: 0.95 }}
      >
        {getMascotSvg(mascot.avatarType)}
      </motion.div>

      {/* Mascot Name Badge */}
      <div className="mt-2 text-center">
        <span
          className="inline-block px-3 py-1 rounded-full text-xs font-bold shadow-sm"
          style={{
            backgroundColor: `${mascot.accentColor}15`,
            color: mascot.accentColor,
            border: `1.5px solid ${mascot.accentColor}40`
          }}
        >
          {mascot.name}
        </span>
      </div>
    </div>
  );
};
