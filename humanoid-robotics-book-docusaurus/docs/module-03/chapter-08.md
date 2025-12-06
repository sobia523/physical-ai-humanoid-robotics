# Chapter 8: Manipulation & Grasping

## Introduction

Dexterous manipulation is essential for humanoid robots to interact with objects. This chapter covers grasp planning, force control, and manipulation strategies.

---

## 1. Grasp Analysis

### 1.1 Force Closure
**Definition**: A grasp achieves force closure if it can resist arbitrary external wrenches.

**Condition**: Grasp matrix $G$ must span the wrench space.

### 1.2 Grasp Quality Metrics
- **Largest minimum wrench**: Maximum disturbance resistable
- **Volume of grasp wrench space**
- **Manipulability ellipsoid**

---

## 2. Grasp Planning

### 2.1 Analytical Methods
- Parallel-jaw grasps
- Power vs. precision grasps
- Antipodal grasps

### 2.2 Data-Driven Approaches
**GraspNet**:
- Deep learning for grasp pose prediction
- Input: Point cloud
- Output: 6D grasp poses + scores

**Code**:
```python
from graspnetAPI import GraspNet

model = GraspNet()
point_cloud = load_point_cloud('object.pcd')
grasps = model.predict(point_cloud)
best_grasp = grasps[np.argmax(grasps.scores)]
```

---

## 3. Force Control

### 3.1 Impedance Control
$$F = K_p (x_d - x) + K_d (\dot{x}_d - \dot{x})$$

**Applications**:
- Compliant manipulation
- Assembly tasks
- Human-robot collaboration

### 3.2 Hybrid Position/Force Control
- Control position in free directions
- Control force in constrained directions

---

## 4. Dexterous Manipulation

### 4.1 In-Hand Manipulation
- Finger gaiting
- Rolling and sliding
- Regrasping

### 4.2 Tool Use
- Learning tool affordances
- Trajectory adaptation
- Multi-step tasks

---

## 5. Case Studies

### 5.1 Shadow Dexterous Hand
- 20 DOF, 5-finger hand
- Tactile sensors on fingertips
- Applications: Research, prosthetics

### 5.2 OpenAI Dactyl
- RL for Rubik's cube solving
- Trained in simulation, deployed on hardware
- Domain randomization for robustness

---

## 6. Lab Activity: Grasp Planning with MoveIt 2

### Objective
Plan and execute grasps using MoveIt 2 framework.

**Code**:
```python
from moveit_msgs.msg import Grasp
from geometry_msgs.msg import PoseStamped

def create_grasp(pose, approach_distance=0.1):
    grasp = Grasp()
    grasp.grasp_pose = pose
    
    # Pre-grasp approach
    grasp.pre_grasp_approach.direction.vector.z = -1.0
    grasp.pre_grasp_approach.min_distance = approach_distance
    
    # Post-grasp retreat
    grasp.post_grasp_retreat.direction.vector.z = 1.0
    grasp.post_grasp_retreat.min_distance = 0.1
    
    return grasp
```

---

## Summary
- ✅ Force closure and grasp quality metrics
- ✅ Analytical and data-driven grasp planning
- ✅ Force and impedance control
- ✅ Dexterous manipulation techniques

---

## Review Questions
1. Prove the force closure condition for a 2-finger grasp
2. Compare analytical vs. learning-based grasp planning
3. Design an impedance controller for compliant assembly

---

## References
1. Murray, R. M., et al. (1994). *A Mathematical Introduction to Robotic Manipulation*. CRC Press.
2. Mahler, J., et al. (2017). "Dex-Net 2.0: Deep learning to plan robust grasps." *RSS*.

---

**Next**: [Chapter 9: Motion Planning & Navigation](/docs/module-03/chapter-09)
