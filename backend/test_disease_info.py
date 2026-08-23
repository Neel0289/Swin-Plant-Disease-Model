"""
test_disease_info.py - Step 3 verification
Verifies: 1) exact key match for every CLASS_NAMES entry in DISEASE_INFO
           2) get_disease_info() returns real non-fallback data for every class.
Run from Interface/backend/:  python test_disease_info.py
"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from class_names import CLASS_NAMES, DISEASE_INFO, get_disease_info

FALLBACK_DESCRIPTION = "No additional information available for this condition."
FALLBACK_REMEDY = "Consult a local agricultural extension service for guidance."
REQUIRED_FIELDS = ["display_name", "plant", "severity", "description", "remedies"]

pass_count = 0
fail_count = 0
failures = []

sep = "=" * 70
print(sep)
print(f"  test_disease_info.py -- {len(CLASS_NAMES)} classes to verify")
print(sep)
print()

# Check 1: exact key presence
print("[CHECK 1] Every CLASS_NAMES entry has an exact matching key in DISEASE_INFO")
missing_from_info = [c for c in CLASS_NAMES if c not in DISEASE_INFO]
extra_in_info = [k for k in DISEASE_INFO if k not in CLASS_NAMES]
if missing_from_info:
    print(f"  FAIL -- {len(missing_from_info)} CLASS_NAMES entries missing from DISEASE_INFO:")
    for c in missing_from_info:
        print(f"     * {c!r}")
    fail_count += len(missing_from_info)
else:
    print(f"  PASS -- All {len(CLASS_NAMES)} CLASS_NAMES entries found in DISEASE_INFO.")
    pass_count += 1
if extra_in_info:
    print(f"  NOTE -- {len(extra_in_info)} orphaned DISEASE_INFO keys not in CLASS_NAMES:")
    for k in extra_in_info:
        print(f"     * {k!r}")
print()

# Check 2: per-class field validation
print("[CHECK 2] get_disease_info() returns real (non-fallback) data per class")
print()
col_w = max(len(c) for c in CLASS_NAMES) + 2

for class_name in CLASS_NAMES:
    info = get_disease_info(class_name)
    problems = []
    if class_name not in DISEASE_INFO:
        problems.append("NO EXACT KEY in DISEASE_INFO")
    if info.get("description", "") == FALLBACK_DESCRIPTION:
        problems.append("fallback description")
    remedies = info.get("remedies", [])
    if remedies == [FALLBACK_REMEDY]:
        problems.append("fallback remedies")
    for field in REQUIRED_FIELDS:
        val = info.get(field)
        if val is None or val == "" or val == []:
            problems.append(f"empty/missing {field!r}")
    if info.get("severity") == "Unknown":
        problems.append("severity is Unknown (fallback)")

    if problems:
        status = "FAIL"
        fail_count += 1
        failures.append((class_name, problems))
    else:
        status = "PASS"
        pass_count += 1

    line = f"  [{status}] {class_name:<{col_w}}"
    if problems:
        line += " -- " + ", ".join(problems)
    else:
        sev = info["severity"]
        nr = len(info["remedies"])
        line += f" (severity={sev!r}, {nr} remedies)"
    print(line)

# Summary
print()
print(sep)
print(f"  RESULT: {pass_count} PASS, {fail_count} FAIL out of {len(CLASS_NAMES)} classes")
if failures:
    print()
    print("  Failed classes:")
    for cls, probs in failures:
        print(f"    * {cls}: {'; '.join(probs)}")
print(sep)
sys.exit(0 if fail_count == 0 else 1)
