# Chapter 9: Motion Planning & Navigation

## Introduction

Motion planning enables robots to navigate from start to goal while avoiding obstacles. This chapter covers sampling-based, optimization-based, and learning-based planning methods.

---

## 1. Configuration Space

### 1.1 C-Space Representation
- Joint space vs. task space
- C-obstacles (configuration space obstacles)
- Dimensionality curse

### 1.2 Collision Detection
- Bounding volumes (AABB, OBB, spheres)
- GJK algorithm
- Continuous collision detection

---

## 2. Sampling-Based Planning

### 2.1 Rapidly-Exploring Random Trees (RRT)
**Algorithm**:
1. Sample random configuration
2. Find nearest node in tree
3. Extend toward sample
4. Check collision
5. Add to tree if valid

**Variants**:
- RRT* (asymptotically optimal)
- RRT-Connect (bidirectional)
- Informed RRT*

**Code**:
```python
def rrt(start, goal, obstacles, max_iter=1000):
    tree = {start: None}
    for _ in range(max_iter):
        q_rand = sample_random()
        q_near = nearest_neighbor(tree, q_rand)
        q_new = steer(q_near, q_rand, step_size=0.1)
        if not collides(q_new, obstacles):
            tree[q_new] = q_near
            if distance(q_new, goal) < threshold:
                return extract_path(tree, q_new)
    return None
```

### 2.2 Probabilistic Roadmaps (PRM)
- Preprocessing: Build roadmap
- Query: Find path in roadmap
- Suitable for multiple queries

---

## 3. Optimization-Based Planning

### 3.1 CHOMP (Covariant Hamiltonian Optimization)
Minimize cost functional:
$$\min_\xi \int_0^1 ||\dot{\xi}(t)||^2 dt + \lambda \int_0^1 c(\xi(t)) dt$$

Where $c(\xi)$ is obstacle cost.

### 3.2 TrajOpt
- Sequential convex optimization
- Handles constraints (joint limits, collisions)
- Fast convergence

---

## 4. Navigation for Mobile Robots

### 4.1 Global Planning
- A* algorithm
- Dijkstra's algorithm
- D* Lite (dynamic replanning)

### 4.2 Local Planning
- Dynamic Window Approach (DWA)
- Timed Elastic Band (TEB)
- Model Predictive Control (MPC)

---

## 5. Learning-Based Planning

### 5.1 Neural Motion Planning
- Learn heuristics for sampling
- Predict collision-free paths
- Example: MPNet

### 5.2 Imitation Learning
- Learn from expert demonstrations
- Behavior cloning
- DAgger (Dataset Aggregation)

---

## 6. Case Studies

### 6.1 Fetch Mobile Manipulator
- RRT for arm planning
- A* for base navigation
- Integrated whole-body planning

### 6.2 Tesla Autopilot
- Neural network path planning
- Real-time obstacle avoidance
- Vision-only navigation

---

## 7. Lab Activity: RRT Implementation

### Objective
Implement RRT for 2D navigation.

**Code**:
```python
import numpy as np
import matplotlib.pyplot as plt

class RRT:
    def __init__(self, start, goal, obstacles):
        self.start = start
        self.goal = goal
        self.obstacles = obstacles
        self.tree = {tuple(start): None}
    
    def plan(self, max_iter=1000):
        for _ in range(max_iter):
            q_rand = self.sample()
            q_near = self.nearest(q_rand)
            q_new = self.steer(q_near, q_rand)
            
            if not self.collides(q_new):
                self.tree[tuple(q_new)] = tuple(q_near)
                
                if np.linalg.norm(q_new - self.goal) < 0.5:
                    return self.extract_path(q_new)
        return None
    
    def sample(self):
        return np.random.rand(2) * 10  # 10x10 workspace
    
    # ... (implement other methods)
```

---

## Summary
- ✅ Configuration space and collision detection
- ✅ Sampling-based planners (RRT, PRM)
- ✅ Optimization-based methods (CHOMP, TrajOpt)
- ✅ Learning-based planning

---

## Review Questions
1. Prove RRT is probabilistically complete
2. Compare RRT and PRM for high-DOF robots
3. Formulate motion planning as an optimization problem

---

## References
1. LaValle, S. M. (2006). *Planning Algorithms*. Cambridge University Press.
2. Karaman, S., & Frazzoli, E. (2011). "Sampling-based algorithms for optimal motion planning." *IJRR*.

---

**Next Module**: [Module 4: Physical AI Integrations](/docs/module-04/intro)
