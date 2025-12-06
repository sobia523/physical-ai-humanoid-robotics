# Chapter 12: Digital Twins & Simulation Systems

## Introduction

Digital twins—virtual replicas of physical robots—enable testing, validation, and training without hardware risk. This chapter covers simulation engines, sim-to-real transfer, and digital twin architectures.

---

## 1. Physics Simulation Engines

### 1.1 MuJoCo (Multi-Joint dynamics with Contact)
- Fast, accurate contact dynamics
- Used in: DeepMind, OpenAI research
- Supports: Rigid bodies, soft bodies, tendons

**Code**:
```python
import mujoco
import mujoco.viewer

model = mujoco.MjModel.from_xml_path('humanoid.xml')
data = mujoco.MjData(model)

with mujoco.viewer.launch_passive(model, data) as viewer:
    while viewer.is_running():
        mujoco.mj_step(model, data)
        viewer.sync()
```

### 1.2 Gazebo/Ignition
- ROS integration
- Sensor plugins (cameras, LiDAR)
- Distributed simulation

### 1.3 Isaac Sim (NVIDIA)
- GPU-accelerated physics
- Photorealistic rendering
- Supports thousands of parallel environments

---

## 2. Sim-to-Real Transfer

### 2.1 Domain Randomization
Randomize simulation parameters:
- **Visual**: Lighting, textures, camera noise
- **Physical**: Friction, mass, damping
- **Dynamics**: Actuator delays, sensor noise

**Result**: Policy robust to real-world variation

### 2.2 System Identification
Learn simulator parameters from real data:
$$\theta^* = \arg\min_\theta ||y_{real} - y_{sim}(\theta)||^2$$

### 2.3 Residual Learning
- Train base policy in simulation
- Learn residual correction on hardware
- Combine: $\pi_{real} = \pi_{sim} + \pi_{residual}$

---

## 3. Digital Twin Architecture

### 3.1 Components
```
┌──────────────┐
│ Physical     │ ──sensor data──> ┌──────────────┐
│ Robot        │                   │ Digital Twin │
└──────────────┘ <──commands───── └──────────────┘
                                         │
                                         ▼
                                   ┌──────────────┐
                                   │ Analytics &  │
                                   │ Prediction   │
                                   └──────────────┘
```

### 3.2 Synchronization
- Real-time state mirroring
- Predictive simulation (run ahead of reality)
- Anomaly detection

---

## 4. Simulation for Training

### 4.1 Parallel Environments
Train RL policies with massive parallelism:

**Isaac Gym**:
- 4096 environments on single GPU
- 100x faster than CPU simulation

**Code**:
```python
from isaacgym import gymapi

gym = gymapi.acquire_gym()

# Create 1000 parallel environments
envs = []
for i in range(1000):
    env = gym.create_env(sim, env_lower, env_upper, num_per_row)
    envs.append(env)

# Parallel step
gym.simulate(sim)
gym.fetch_results(sim, True)
```

### 4.2 Curriculum Learning
- Start with simple tasks
- Gradually increase difficulty
- Example: Walk on flat ground → stairs → rough terrain

---

## 5. Case Studies

### 5.1 Agility Robotics Digit
- Trained in Isaac Gym (4096 parallel envs)
- Domain randomization for robustness
- Deployed with minimal fine-tuning

### 5.2 Tesla Dojo
- Custom supercomputer for simulation
- Train Optimus policies at scale
- Photorealistic rendering for vision

---

## 6. Lab Activity: Building a Digital Twin

### Objective
Create a digital twin of a robot arm in MuJoCo.

**Steps**:
1. Define URDF/MJCF model
2. Implement state synchronization
3. Run predictive simulation
4. Visualize real vs. simulated state

**Code**:
```python
class DigitalTwin:
    def __init__(self, model_path):
        self.model = mujoco.MjModel.from_xml_path(model_path)
        self.data = mujoco.MjData(self.model)
    
    def sync_state(self, real_joint_pos, real_joint_vel):
        """Synchronize with real robot state."""
        self.data.qpos[:] = real_joint_pos
        self.data.qvel[:] = real_joint_vel
    
    def predict(self, control_input, steps=10):
        """Predict future states."""
        self.data.ctrl[:] = control_input
        for _ in range(steps):
            mujoco.mj_step(self.model, self.data)
        return self.data.qpos.copy()
```

---

## Summary
- ✅ Physics engines (MuJoCo, Gazebo, Isaac Sim)
- ✅ Sim-to-real transfer techniques
- ✅ Digital twin architectures
- ✅ Parallel simulation for RL training

---

## Review Questions
1. Compare MuJoCo and Gazebo for humanoid simulation
2. Design a domain randomization strategy for bipedal walking
3. Implement system identification to tune simulator parameters

---

## References
1. Todorov, E., et al. (2012). "MuJoCo: A physics engine for model-based control." *IROS*.
2. Tobin, J., et al. (2017). "Domain randomization for transferring deep neural networks from simulation to the real world." *IROS*.

---

**Next Module**: [Module 5: Capstone Project](/docs/module-05/intro)
