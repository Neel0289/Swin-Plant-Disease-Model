CLASS_NAMES = [
    "Apple_cedar_apple_rust",
    "Apple_healthy",
    "Apple_scab",
    "Cherry_healthy",
    "Corn_common_rust",
    "Corn_gray_leaf_spot",
    "Corn_northern_leaf_blight",
    "Grape_black_rot",
    "Grape_healthy",
    "Peach_healthy",
    "Pepper_bell_bacterial_spot",
    "Pepper_bell_healthy",
    "Potato_early_blight",
    "Potato_late_blight",
    "Soybean_healthy",
    "Tomato_bacterial_spot",
    "Tomato_early_blight",
    "Tomato_healthy",
    "Tomato_late_blight",
    "Tomato_leaf_mold",
    "Tomato_mosaic_virus",
    "Tomato_septoria_leaf_spot",
    "Tomato_yellow_leaf_curl_virus",
]

DISEASE_INFO = {
    "Apple_cedar_apple_rust": {
        "display_name": "Cedar Apple Rust",
        "plant": "Apple",
        "severity": "Moderate",
        "causal_agent": "Gymnosporangium juniperi-virginianae",
        "description": "A rust fungus that alternates between juniper/cedar hosts and apple. It survives on junipers through winter and releases spores during wet spring weather, making young apple leaves and fruit most vulnerable. In severe cases it can weaken foliage, reduce fruit quality, and cause premature leaf drop.",
        "symptoms": "Bright yellow-orange spots develop on apple leaves, often becoming larger and more obvious after wet periods. Later stages may show tube-like or rust-colored structures on the underside of leaves, and susceptible fruit can become distorted or spotted. Nearby junipers may show perennial galls that swell and produce orange gelatinous horns after rain.",
        "remedies": [
            "Plant resistant or less susceptible apple cultivars where possible.",
            "Prune and remove cedar-juniper galls from alternate hosts when practical.",
            "Apply protectant fungicides at bud break and continue through the period of primary infection risk, following label directions.",
            "Improve orchard airflow by pruning trees to reduce leaf wetness duration.",
            "Monitor weather conditions, because infection is favored by cool, wet spring periods."
        ],
        "regulatory_note": "Check local registration and label approval before using myclobutanil, propiconazole, trifloxystrobin, or other fungicides. Product availability, crop labeling, application timing, and residue limits can differ by region.",
    },

    "Apple_healthy": {
        "display_name": "Healthy Apple",
        "plant": "Apple",
        "severity": "None",
        "causal_agent": None,
        "description": "No visible disease symptoms are detected on the leaf image. A healthy apple plant typically has uniform green foliage, normal leaf shape, and no visible spotting, rust pustules, lesions, or premature yellowing. This class represents normal tissue rather than a disease state.",
        "symptoms": "Leaves are evenly green and intact, without scab lesions, rust spots, blight, curling, or unusual discoloration. Fruit and foliage appear structurally normal in the visible image.",
        "remedies": [
            "Continue routine scouting during the growing season.",
            "Maintain sanitation by removing fallen leaves and fruit when applicable.",
            "Use balanced fertilization and proper irrigation to reduce stress.",
            "Preserve good canopy airflow through appropriate pruning."
        ],
    },

    "Apple_scab": {
        "display_name": "Apple Scab",
        "plant": "Apple",
        "severity": "Moderate",
        "causal_agent": "Venturia inaequalis",
        "description": "A fungal disease that commonly infects leaves, fruit, and young shoots of apple. It is favored by cool, wet spring weather and repeated leaf wetness. Severe disease can cause defoliation, fruit cracking, reduced market quality, and weaker trees over time.",
        "symptoms": "Early leaf infections often begin as pale green or olive spots that turn velvety and dark. Spots may enlarge, become cracked or torn, and cause puckering or distortion of the leaf blade. On fruit, lesions become rough, corky, and scabby, often lowering quality and causing premature drop in severe cases.",
        "remedies": [
            "Remove and destroy fallen leaves or shred them to reduce overwintering inoculum.",
            "Plant scab-resistant cultivars where possible.",
            "Use an orchard canopy that allows fast drying after rain or overhead moisture.",
            "Apply fungicides preventively during infection periods when the product is labeled for the crop.",
            "Support sanitation and mulching practices that reduce carryover of spores from one season to the next."
        ],
        "regulatory_note": "Check local registration before using captan, mancozeb, sulfur, or other fungicides. Ensure the product is approved for apple, the target disease, and the intended application timing in your region.",
    },

    "Cherry_healthy": {
        "display_name": "Healthy Cherry",
        "plant": "Cherry",
        "severity": "None",
        "causal_agent": None,
        "description": "No visible disease symptoms are detected. A healthy cherry leaf is typically uniformly green, intact, and free from powdery growth, spotting, shot holes, or chlorosis. This class indicates normal appearance rather than a disease condition.",
        "symptoms": "Leaves show normal green coloration, no lesions, and no visible necrosis, mildew, or curling.",
        "remedies": [
            "Continue periodic monitoring for leaf spots and fungal growth.",
            "Maintain pruning and canopy sanitation to reduce humidity inside the tree.",
            "Remove fallen leaves and infected fruit if disease appears later."
        ],
    },

    "Corn_common_rust": {
        "display_name": "Corn Common Rust",
        "plant": "Corn",
        "severity": "Moderate",
        "causal_agent": "Puccinia sorghi",
        "description": "A foliar rust disease of maize that develops best in mild temperatures and humid conditions. It can spread rapidly when conditions remain favorable and can reduce photosynthetic area if infection becomes severe. The disease is usually most visible on leaves but can significantly affect crop performance when pressure is high.",
        "symptoms": "Small, oval to elongated cinnamon-brown pustules appear on leaf surfaces and may rupture to release rusty spores. Infections can occur on both sides of the leaf, and large numbers of pustules may merge under heavy disease pressure. Older lesions may darken as the leaf tissue ages.",
        "remedies": [
            "Plant resistant hybrids when available.",
            "Scout fields regularly, especially during periods of moderate temperatures and high humidity.",
            "Use labeled fungicides only when disease pressure and crop stage justify treatment.",
            "Avoid late planting where rust pressure tends to build."
        ],
        "regulatory_note": "Verify local label status before using triazoles or strobilurin fungicides. Product approval, timing, and maximum residue limits vary by country and crop.",
    },

    "Corn_gray_leaf_spot": {
        "display_name": "Corn Gray Leaf Spot",
        "plant": "Corn",
        "severity": "High",
        "causal_agent": "Cercospora zeae-maydis",
        "description": "A major fungal leaf disease of corn that often appears in fields with heavy residue and favorable humidity. It frequently begins on lower leaves and moves upward when weather remains conducive. Severe epidemics can reduce grain fill by damaging large portions of the canopy during critical growth stages.",
        "symptoms": "Rectangular gray-tan lesions form between leaf veins and often remain parallel to the veins. As lesions expand, large sections of leaf tissue may become necrotic and dry, giving a blighted appearance. In advanced cases, the lower canopy is heavily affected and yield may suffer.",
        "remedies": [
            "Plant resistant or tolerant hybrids where available.",
            "Rotate crops and reduce infected residue carryover.",
            "Use tillage or residue-management practices that lower inoculum where appropriate.",
            "Apply labeled fungicides if disease pressure is high and the crop is at a vulnerable stage."
        ],
        "regulatory_note": "Check local approval before using strobilurin or triazole fungicides. Label restrictions, timing windows, and residue rules can differ by jurisdiction.",
    },

    "Corn_northern_leaf_blight": {
        "display_name": "Northern Corn Leaf Blight",
        "plant": "Corn",
        "severity": "High",
        "causal_agent": "Exserohilum turcicum",
        "description": "A fungal leaf disease that can become severe in humid environments and in susceptible hybrids. It typically begins on lower leaves and progresses upward, especially when foliage stays wet for long periods. Heavy infection during grain fill can reduce photosynthetic capacity and lower yield.",
        "symptoms": "Long, cigar-shaped gray-green to tan lesions appear on leaves and may expand substantially. Lesions can merge under favorable conditions, causing large blighted areas and premature leaf death. Severely infected plants may show a visibly reduced green canopy.",
        "remedies": [
            "Use resistant hybrids whenever possible.",
            "Rotate away from corn and manage residue to reduce overwintering inoculum.",
            "Apply labeled fungicides when disease risk is high and economic return is likely.",
            "Scout fields early so treatment decisions can be made before lesions spread extensively."
        ],
    },

    "Grape_black_rot": {
        "display_name": "Grape Black Rot",
        "plant": "Grape",
        "severity": "High",
        "causal_agent": "Guignardia bidwellii",
        "description": "A fungal disease of grape that can affect leaves, shoots, fruit, and petioles. It is especially damaging because berry infections can lead to hard black mummies that remain as a source of inoculum. Warm, wet weather strongly favors infection and spread.",
        "symptoms": "Leaf spots are typically reddish-brown with dark borders and may develop tiny black fruiting bodies. Fruit infections cause berries to turn brown, then black, shrivel, and mummify. In severe cases, many berries on a cluster become unmarketable.",
        "remedies": [
            "Remove and destroy mummified berries and diseased plant debris.",
            "Prune vines to improve airflow and speed leaf drying.",
            "Apply labeled fungicides during the infection window, starting early in the season if risk is high.",
            "Maintain vineyard sanitation and canopy management to reduce inoculum."
        ],
        "regulatory_note": "Verify local label status before using myclobutanil, mancozeb, or other fungicides. The same ingredient may be permitted in one crop or region and restricted in another.",
    },

    "Grape_healthy": {
        "display_name": "Healthy Grape",
        "plant": "Grape",
        "severity": "None",
        "causal_agent": None,
        "description": "No visible disease symptoms are detected. Healthy grape foliage is usually evenly colored, turgid, and free from spots, mold, rusting, or unusual distortion. This class should be used only when the plant appears visually normal in the image.",
        "symptoms": "Leaves are green and intact, with no visible lesions, mildew, or necrotic spotting.",
        "remedies": [
            "Continue routine scouting for fungal and bacterial diseases.",
            "Maintain canopy management to keep humidity low inside the vine row.",
            "Remove infected debris promptly if symptoms appear later."
        ],
    },

    "Peach_healthy": {
        "display_name": "Healthy Peach",
        "plant": "Peach",
        "severity": "None",
        "causal_agent": None,
        "description": "No visible disease symptoms are detected. Healthy peach leaves generally show uniform color, normal leaf shape, and no scab-like lesions, shot holes, curling, or bacterial spotting. This class represents normal canopy health.",
        "symptoms": "Leaves and shoots appear healthy, with no visible spotting, deformation, or chlorosis.",
        "remedies": [
            "Continue monitoring during humid periods.",
            "Maintain orchard sanitation and proper pruning.",
            "Remove diseased plant debris if future symptoms appear."
        ],
    },

    "Pepper_bell_bacterial_spot": {
        "display_name": "Bell Pepper Bacterial Spot",
        "plant": "Bell Pepper",
        "severity": "Moderate",
        "causal_agent": "Xanthomonas spp. / pathovars",
        "description": "A bacterial disease affecting pepper leaves and fruit, often introduced through infected seed or transplants and spread by rain splash, handling, and contaminated equipment. It can reduce yield and fruit quality, especially during warm, wet weather. Severe outbreaks may cause premature leaf drop and scabby fruit.",
        "symptoms": "Small water-soaked spots become brown or black and may develop yellow halos. Lesions can merge, leading to torn leaf tissue and defoliation. Fruit may develop raised, scabby spots that reduce marketability.",
        "remedies": [
            "Use disease-free seed and transplants from reliable sources.",
            "Avoid field work when foliage is wet to reduce spread.",
            "Rotate away from peppers and related crops for multiple seasons.",
            "Use copper-based protectants only where labeled and as part of an integrated program."
        ],
        "regulatory_note": "Copper products are often label-restricted and may have residue or phytotoxicity concerns. Check local approval carefully before use.",
    },

    "Pepper_bell_healthy": {
        "display_name": "Healthy Bell Pepper",
        "plant": "Bell Pepper",
        "severity": "None",
        "causal_agent": None,
        "description": "No visible disease symptoms are detected. Healthy pepper foliage is typically green, firm, and free from spotting, blight, or bacterial lesions. This class indicates a healthy leaf image rather than a disease state.",
        "symptoms": "Leaves show normal color and shape, without halos, necrosis, or water-soaked lesions.",
        "remedies": [
            "Continue regular monitoring.",
            "Maintain even irrigation and good drainage.",
            "Remove infected debris if symptoms later develop."
        ],
    },

    "Potato_early_blight": {
        "display_name": "Potato Early Blight",
        "plant": "Potato",
        "severity": "Moderate",
        "causal_agent": "Alternaria solani",
        "description": "A common fungal disease of potato that often begins on older leaves and can progress upward. It is favored by plant stress, warm weather, and periods of leaf wetness. Repeated defoliation can reduce tuber size and yield if unmanaged.",
        "symptoms": "Dark lesions with concentric rings give a target-board appearance, usually first on lower leaves. Surrounding tissue may yellow, and older leaves can dry out and drop prematurely. Stem and petiole lesions may also occur in severe cases.",
        "remedies": [
            "Remove infected debris and rotate crops to non-hosts.",
            "Maintain plant vigor with balanced fertility and irrigation.",
            "Use labeled fungicides preventively if disease pressure is expected.",
            "Mulch or manage soil splash to reduce spread from crop residue."
        ],
        "regulatory_note": "Verify local registration before using mancozeb or chlorothalonil. Always follow crop-specific label directions and preharvest intervals.",
    },

    "Potato_late_blight": {
        "display_name": "Potato Late Blight",
        "plant": "Potato",
        "severity": "Critical",
        "causal_agent": "Phytophthora infestans",
        "description": "A destructive oomycete disease that can spread very rapidly under cool, wet conditions. It attacks foliage, stems, and tubers, and historically caused major crop losses when outbreaks were uncontrolled. Prompt action is important because epidemics can expand quickly through a field and storage tubers can also be affected.",
        "symptoms": "Water-soaked lesions appear on leaves and rapidly turn brown to black, often with a greasy look. White fuzzy growth may appear on lesion margins or undersides of leaves in humid weather. Stems can become blighted and tubers may develop firm brown decay beneath the skin.",
        "remedies": [
            "Destroy infected plant material and avoid moving infected tubers into storage.",
            "Avoid overhead irrigation and manage canopy moisture.",
            "Use resistant varieties where available.",
            "Apply labeled late-blight fungicides promptly when weather or scouting indicates risk."
        ],
        "regulatory_note": "Verify local label status for metalaxyl, cymoxanil, and related late-blight fungicides. Some products face resistance-management limits and crop-specific restrictions.",
    },

    "Soybean_healthy": {
        "display_name": "Healthy Soybean",
        "plant": "Soybean",
        "severity": "None",
        "causal_agent": None,
        "description": "No visible disease symptoms are detected. Healthy soybean leaves are typically uniform in color and free from spotting, lesions, mildew, or abnormal yellowing. This class should be used when the leaf image appears normal.",
        "symptoms": "Canopy appears healthy, with no obvious leaf spots, chlorosis, or necrosis.",
        "remedies": [
            "Continue scouting for foliar diseases and insect injury.",
            "Maintain crop rotation and fertility.",
            "Monitor moisture stress and canopy closure."
        ],
    },

    "Tomato_bacterial_spot": {
        "display_name": "Tomato Bacterial Spot",
        "plant": "Tomato",
        "severity": "Moderate",
        "causal_agent": "Xanthomonas spp.",
        "description": "A bacterial disease of tomato that affects leaves, stems, and fruit, especially in warm, wet conditions. It is often introduced on infected seed or transplants and spreads by water splash, handling, and contaminated equipment. Fruit symptoms can cause substantial market loss even when leaf damage is moderate.",
        "symptoms": "Leaf spots begin as small water-soaked lesions that darken and may develop yellow halos. Severe infections cause shot-hole appearance, leaf blight, and defoliation. Fruit lesions are dark, raised, and scabby, often with a rough surface.",
        "remedies": [
            "Start with disease-free seed and transplants.",
            "Avoid overhead watering and work when foliage is dry.",
            "Remove infected debris and volunteer hosts.",
            "Use copper-based protectants only where labeled and as part of an integrated program."
        ],
        "regulatory_note": "Copper products and any antibiotic bactericides may have crop, rate, or regional restrictions. Check local registration and label instructions before use.",
    },

    "Tomato_early_blight": {
        "display_name": "Tomato Early Blight",
        "plant": "Tomato",
        "severity": "Moderate",
        "causal_agent": "Alternaria solani",
        "description": "A fungal disease that usually starts on older leaves and becomes more severe when plants are stressed or foliage stays wet. It can defoliate plants and expose fruit to sunscald if unmanaged. The disease is common in gardens and production fields where residue and splash dispersal are present.",
        "symptoms": "Dark brown lesions often have concentric rings, creating a target-like pattern. Lower leaves yellow around the lesions and may drop prematurely. Stems and petioles can also develop elongated dark lesions.",
        "remedies": [
            "Mulch to reduce soil splash onto leaves.",
            "Rotate crops and remove infected debris after harvest.",
            "Stake or cage plants to improve airflow and reduce leaf wetness.",
            "Use labeled fungicides preventively when disease pressure is high."
        ],
        "regulatory_note": "Verify local label status for mancozeb and chlorothalonil. Compliance with local residue limits and re-entry intervals is essential.",
    },

    "Tomato_healthy": {
        "display_name": "Healthy Tomato",
        "plant": "Tomato",
        "severity": "None",
        "causal_agent": None,
        "description": "No visible disease symptoms are detected. Healthy tomato leaves are usually uniform in color and shape, without lesions, mosaic, curling, mildew, or chlorosis. This class indicates a normal healthy leaf image.",
        "symptoms": "Leaves and stems appear normal with no visible spotting, blight, or distortion.",
        "remedies": [
            "Continue routine monitoring.",
            "Maintain consistent watering and nutrition.",
            "Remove diseased plants promptly if symptoms later appear."
        ],
    },

    "Tomato_late_blight": {
        "display_name": "Tomato Late Blight",
        "plant": "Tomato",
        "severity": "Critical",
        "causal_agent": "Phytophthora infestans",
        "description": "A severe oomycete disease that spreads quickly during cool, moist weather and can destroy foliage, stems, and fruit. Because it can move fast once established, early detection and rapid response are essential. It is one of the most damaging tomato diseases in wet seasons.",
        "symptoms": "Large, irregular water-soaked lesions rapidly turn brown or black. White sporulation may appear under humid conditions on leaf undersides or lesion edges. Fruit can become firm, discolored, and rotted, often leading to rapid plant collapse.",
        "remedies": [
            "Remove and destroy infected plants immediately.",
            "Avoid overhead irrigation and reduce leaf wetness.",
            "Use resistant varieties in future plantings.",
            "Apply labeled late-blight fungicides promptly when weather favors outbreaks."
        ],
        "regulatory_note": "Verify local label status for metalaxyl, cymoxanil, and related products. Resistance-management guidance may limit how often some fungicides can be used.",
    },

    "Tomato_leaf_mold": {
        "display_name": "Tomato Leaf Mold",
        "plant": "Tomato",
        "severity": "Moderate",
        "causal_agent": "Passalora fulva",
        "description": "A fungal disease that is most common in humid greenhouses or protected cultivation. It thrives when relative humidity is high and air movement is poor. The disease generally affects leaves first and can reduce photosynthetic area if not managed.",
        "symptoms": "Yellow or pale green spots appear on the upper leaf surface, while olive-green to brown mold develops on the lower surface. In severe cases, leaves yellow, curl, and die back. Symptoms are often more obvious on older foliage lower in the canopy.",
        "remedies": [
            "Reduce humidity and improve ventilation.",
            "Space plants to improve airflow and reduce leaf wetness.",
            "Remove heavily infected leaves when practical.",
            "Use labeled fungicides only if needed and appropriate for protected cultivation."
        ],
    },

    "Tomato_mosaic_virus": {
        "display_name": "Tomato Mosaic Virus",
        "plant": "Tomato",
        "severity": "High",
        "causal_agent": "Tomato mosaic virus",
        "description": "A highly contagious tobamovirus that spreads mechanically through hands, tools, contaminated surfaces, and plant material. It can persist on equipment and debris for long periods, making sanitation critical. Infected plants may remain alive but often produce reduced yields and poor-quality fruit.",
        "symptoms": "Leaves may show mosaic mottling, mottled light and dark green patterning, distortion, and stunting. Older leaves can become rough or narrowed, and infected plants often look uneven in vigor. Fruit quality may decline, and severe infections can reduce overall productivity.",
        "remedies": [
            "Use certified virus-free seed and transplants.",
            "Disinfect tools, benches, and hands after handling infected plants.",
            "Remove and destroy infected plants to reduce spread.",
            "Avoid tobacco contamination and plant handling practices that move sap between plants."
        ],
    },

    "Tomato_septoria_leaf_spot": {
        "display_name": "Tomato Septoria Leaf Spot",
        "plant": "Tomato",
        "severity": "Moderate",
        "causal_agent": "Septoria lycopersici",
        "description": "A fungal leaf spot disease that usually starts on lower leaves after rain splash or overhead irrigation. It can defoliate plants quickly if conditions stay humid, leaving fruit exposed to sunscald. Because the pathogen survives on debris, sanitation is important for long-term management.",
        "symptoms": "Tiny circular spots with dark margins and lighter centers appear on lower leaves first. As spots multiply, affected leaves yellow, die, and drop. In severe cases, large parts of the lower canopy are lost.",
        "remedies": [
            "Remove infected lower leaves and plant debris.",
            "Stake or cage plants to improve air circulation.",
            "Avoid working in wet foliage and reduce splash dispersal.",
            "Use labeled protectant fungicides when needed."
        ],
        "regulatory_note": "Check local registration before using chlorothalonil or mancozeb. Product labels may differ for home garden, greenhouse, and field use.",
    },

    "Tomato_yellow_leaf_curl_virus": {
        "display_name": "Tomato Yellow Leaf Curl Virus",
        "plant": "Tomato",
        "severity": "Critical",
        "causal_agent": "Begomovirus complex",
        "description": "A whitefly-transmitted viral disease that can severely reduce tomato yield and fruit set. It is especially damaging because infection at young growth stages can stunt plants and prevent normal flowering. Management is mostly preventive because infected plants cannot be cured.",
        "symptoms": "Leaves curl upward, become small and thickened, and often turn yellow between veins. Plants are stunted, internodes shorten, and flowering and fruit set may be greatly reduced. Under heavy pressure, plants may remain small and unproductive for the rest of the season.",
        "remedies": [
            "Use resistant cultivars where available.",
            "Plant virus-free and whitefly-free transplants.",
            "Use reflective mulch and screen/exclusion methods where practical.",
            "Monitor and suppress whiteflies early to reduce spread.",
            "Remove symptomatic plants promptly when infection is detected."
        ],
        "regulatory_note": "Insecticides used for whitefly control are region-specific and often resistance-sensitive. Check local registration, crop label, and resistance-management guidance before use.",
    },
}

SEVERITY_COLORS = {
    "None": "healthy",
    "Moderate": "moderate",
    "High": "high",
    "Critical": "critical",
}

def get_disease_info(class_name: str) -> dict:
    """Return disease info dict for a given class name."""
    info = DISEASE_INFO.get(class_name, {})
    if not info:
        parts = class_name.split("_")
        plant_parts = 2 if class_name.startswith("Pepper_bell_") else 1
        plant = " ".join(parts[:plant_parts]).title() if parts else "Unknown"
        disease = " ".join(parts[plant_parts:]).replace("leaf", "Leaf").title()
        is_healthy = class_name.endswith("_healthy")
        return {
            "display_name": f"Healthy {plant}" if is_healthy else disease,
            "plant": plant,
            "severity": "None" if is_healthy else "Unknown",
            "description": "No additional information available for this condition.",
            "remedies": ["Consult a local agricultural extension service for guidance."],
        }
    return info