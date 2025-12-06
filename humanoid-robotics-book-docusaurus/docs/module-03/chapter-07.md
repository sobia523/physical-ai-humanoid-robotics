# Chapter 7: Humanoid Locomotion Systems

## Introduction

Bipedal locomotion is one of the most challenging problems in robotics. This chapter covers the theory and practice of humanoid walking, from stability criteria to dynamic gaits.

---

## 1. Fundamentals of Bipedal Locomotion

### 1.1 The Stability Problem
**Challenge**: Bipedal walking is inherently unstable (small support polygon).

**Solutions**:
- Static stability (slow, conservative)
- Dynamic stability (fast, energy-efficient)

### 1.2 Zero Moment Point (ZMP)
**Definition**: Point on the ground where net moment from gravity and inertia is zero.

**Criterion**: For stable walking, ZMP must remain inside support polygon.

$$x_{ZMP} = \frac{\sum m_i (\ddot{z}_i + g) x_i}{\sum m_i (\ddot{z}_i + g)}$$

---

## 2. Gait Generation

### 2.1 Central Pattern Generators (CPG)
- Biological inspiration (spinal cord oscillators)
- Coupled oscillators for rhythmic motion
- Robust to perturbations

### 2.2 Trajectory Optimization
Optimize footstep locations and timings:
$$\min \int_0^T ||u(t)||^2 dt$$

Subject to:
- Dynamics constraints
- ZMP stability
- Collision avoidance

---

## 3. Whole-Body Control

### 3.1 Hierarchical Control
1. **High-level**: Footstep planning
2. **Mid-level**: Center of Mass (CoM) trajectory
3. **Low-level**: Joint torques

### 3.2 Quadratic Programming (QP) Formulation
$$\min_{\tau} ||\tau||^2$$

Subject to:
- $M(q)\ddot{q} + C(q,\dot{q}) = \tau + J^T F$
- Contact constraints
- Joint limits

---

## 4. Case Studies

### 4.1 Boston Dynamics Atlas
- MPC for footstep planning
- Whole-body QP control
- Capabilities: Walking, running, backflips

### 4.2 Agility Robotics Digit
- RL-trained locomotion policy
- Sim-to-real transfer
- Deployed in warehouses

---

## 5. Lab Activity: Implementing ZMP Walking

### Objective
Generate stable walking trajectory using ZMP criterion.

**Code**:
```python
import numpy as np

def compute_zmp(com_pos, com_acc, g=9.81):
    """Compute ZMP from CoM state."""
    z_com = com_pos[2]
    zmp_x = com_pos[0] - (z_com / g) * com_acc[0]
    zmp_y = com_pos[1] - (z_com / g) * com_acc[1]
    return np.array([zmp_x, zmp_y])

# Example: Generate CoM trajectory
t = np.linspace(0, 2, 100)
com_pos = np.array([np.sin(t), 0.05*np.cos(2*t), 0.8*np.ones_like(t)])
com_acc = np.array([np.cos(t), -0.1*np.sin(2*t), np.zeros_like(t)])

zmp = compute_zmp(com_pos, com_acc)
# Check if ZMP is inside support polygon
```

---

## Summary
- ✅ ZMP criterion for stability
- ✅ CPG and trajectory optimization for gait generation
- ✅ Whole-body QP control
- ✅ Real-world implementations (Atlas, Digit)

---

## Review Questions
1. Derive the ZMP equation from first principles
2. Compare CPG and trajectory optimization for gait generation
3. Formulate whole-body control as a QP problem

---

## References
1. Vukobratović, M., & Borovac, B. (2004). "Zero-Moment Point—Thirty five years of its life." *IJHR*.
2. Kajita, S., et al. (2003). "Biped walking pattern generation by using preview control of ZMP." *ICRA*.

---

**Next**: [Chapter 8: Manipulation & Grasping](/docs/module-03/chapter-08)
