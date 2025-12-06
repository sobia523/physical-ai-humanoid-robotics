# Chapter 2: Humanoid Robotics Essentials

## Introduction

Humanoid robots—machines designed to mimic the human form—represent one of the most ambitious endeavors in robotics. Their anthropomorphic design enables them to navigate human environments, use human tools, and interact naturally with people. This chapter dissects the essential components that comprise a humanoid robot, from mechanical structures to control architectures.

---

## 1. Why Humanoid Form?

### 1.1 The Anthropomorphic Advantage

**Rationale**:
- **Environment compatibility**: Buildings, tools, and infrastructure designed for humans
- **Social acceptance**: Human-like appearance facilitates interaction
- **Versatility**: Bipedal locomotion + dexterous manipulation = general-purpose capability

**Trade-offs**:
- **Complexity**: High degree-of-freedom (DOF) systems are harder to control
- **Stability**: Bipedal walking is inherently unstable
- **Cost**: Sophisticated actuators and sensors are expensive

### 1.2 Degrees of Freedom (DOF)

A typical humanoid robot has **30-40 DOF**:

| Body Part | DOF | Purpose |
|-----------|-----|---------|
| **Head** | 2-3 | Gaze direction, camera orientation |
| **Torso** | 3 | Bending, twisting |
| **Arms** (×2) | 7 each | Shoulder (3), elbow (1), wrist (3) |
| **Hands** (×2) | 6-12 each | Finger actuation |
| **Legs** (×2) | 6 each | Hip (3), knee (1), ankle (2) |

**Total**: ~35 DOF (without hands), ~60 DOF (with dexterous hands)

---

## 2. Mechanical Systems

### 2.1 Skeletal Structure

**Materials**:
- **Aluminum alloys**: Lightweight, corrosion-resistant
- **Carbon fiber composites**: High strength-to-weight ratio
- **Titanium**: For high-stress joints (hips, knees)

**Design Considerations**:
- **Weight distribution**: Center of mass near hips for stability
- **Joint range of motion**: Match or exceed human capabilities
- **Modularity**: Replaceable components for maintenance

### 2.2 Actuation Technologies

#### Electric Motors (Most Common)

**Brushless DC Motors (BLDC)**:
- High efficiency (>85%)
- Precise control via PWM
- Long lifespan

**Servo Motors**:
- Integrated position feedback
- Used in hobby robots (Dynamixel, Herkulex)

**Quasi-Direct Drive (QDD)**:
- Low gear ratio (6:1 to 9:1) for backdrivability
- High torque density
- Example: MIT Cheetah, Boston Dynamics Atlas

#### Hydraulic Actuators

**Advantages**:
- Extremely high power-to-weight ratio
- Ideal for dynamic locomotion

**Disadvantages**:
- Noisy, messy (fluid leaks)
- Requires pumps and valves
- Example: Boston Dynamics Atlas (hydraulic version)

#### Pneumatic Actuators

**Advantages**:
- Compliant, safe for human interaction
- Lightweight

**Disadvantages**:
- Low precision
- Requires compressed air source

### 2.3 Transmission Systems

**Gear Reducers**:
- **Harmonic drives**: High reduction ratio (50:1 to 160:1), zero backlash
- **Planetary gears**: Compact, efficient
- **Cycloidal drives**: High shock load capacity

**Direct Drive**:
- No gears, motor directly coupled to joint
- Eliminates backlash and friction
- Requires high-torque motors

---

## 3. Electrical & Sensor Systems

### 3.1 Power Systems

**Battery Technologies**:
- **Lithium-ion**: High energy density (150-250 Wh/kg)
- **Lithium-polymer**: Flexible form factor
- **Solid-state** (emerging): Higher safety, energy density

**Power Budget Example (Tesla Optimus)**:
- **Total capacity**: 2.3 kWh
- **Runtime**: 2-8 hours (depending on activity)
- **Peak power**: 500W (walking), 2kW (running)

### 3.2 Proprioceptive Sensors

**Joint Encoders**:
- **Absolute encoders**: Retain position after power loss
- **Incremental encoders**: Higher resolution, require homing

**Force/Torque Sensors**:
- Measure interaction forces at joints or end-effectors
- Enable compliant control and collision detection

**Inertial Measurement Units (IMUs)**:
- 6-axis (accelerometer + gyroscope) or 9-axis (+ magnetometer)
- Estimate orientation and acceleration
- Sampling rate: 100-1000 Hz

### 3.3 Exteroceptive Sensors

**Vision**:
- **RGB cameras**: Color perception, object recognition
- **Depth cameras** (stereo, ToF, structured light): 3D reconstruction
- **Event cameras**: High-speed motion capture (1000+ fps)

**LiDAR**:
- 3D point clouds for mapping and localization
- Range: 0.1-100 meters
- Example: Velodyne, Ouster

**Tactile Sensors**:
- Pressure-sensitive skin for contact detection
- Enables gentle manipulation

---

## 4. Software Architecture

### 4.1 Layered Control Hierarchy

```
┌─────────────────────────────────────┐
│   Task Planning (High-level AI)    │  ← "Pick up the cup"
├─────────────────────────────────────┤
│   Motion Planning (Trajectory Gen)  │  ← Collision-free path
├─────────────────────────────────────┤
│   Whole-Body Control (Dynamics)     │  ← Joint torques
├─────────────────────────────────────┤
│   Low-Level Control (Motor Drivers) │  ← PWM signals
└─────────────────────────────────────┘
```

### 4.2 Real-Time Operating Systems (RTOS)

**Requirements**:
- **Deterministic timing**: Control loops at 100-1000 Hz
- **Low latency**: &lt;1 ms response time
- **Preemptive scheduling**: High-priority tasks interrupt low-priority

**Examples**:
- **VxWorks**: Used in industrial robots
- **QNX**: Safety-certified (ISO 26262)
- **RT-Linux**: Open-source, ROS 2 compatible

### 4.3 Middleware: ROS 2

**Why ROS 2 for Humanoids?**
- **Modular architecture**: Separate perception, planning, control nodes
- **Real-time support**: DDS middleware with QoS policies
- **Ecosystem**: Pre-built packages for SLAM, navigation, manipulation

**Example Node Graph**:
```
Camera → Image Processing → Object Detection
                                ↓
IMU → State Estimation → Whole-Body Controller → Motor Drivers
                                ↑
                          Motion Planner
```

---

## 5. Case Study: Boston Dynamics Atlas

### 5.1 Specifications

- **Height**: 1.5 m (5 ft)
- **Weight**: 89 kg (196 lbs)
- **DOF**: 28 (hydraulic actuators)
- **Sensors**: Stereo cameras, LiDAR, IMU, joint encoders
- **Onboard compute**: Intel Core i7 (perception), custom FPGA (control)

### 5.2 Key Capabilities

**Locomotion**:
- Walking speed: 1.5 m/s
- Running: 2.5 m/s
- Jumping: 1.2 m vertical
- Backflips (demonstrated 2017)

**Manipulation**:
- Lift capacity: 11 kg per hand
- Precision: ±5 mm positioning

### 5.3 Control Innovations

**Model Predictive Control (MPC)**:
- Predicts future states over 0.5-1.0 second horizon
- Optimizes joint torques to achieve desired motion
- Runs at 100 Hz

**Whole-Body Optimization**:
- Simultaneously controls all 28 DOF
- Balances multiple objectives (stability, energy, task completion)

---

## 6. Emerging Trends

### 6.1 Soft Robotics

**Concept**: Use compliant materials (silicone, rubber) instead of rigid links.

**Advantages**:
- Inherently safe for human interaction
- Adaptable to irregular shapes

**Challenges**:
- Difficult to model and control
- Lower precision than rigid robots

### 6.2 Biomimetic Designs

**Inspiration from Biology**:
- **Muscle-like actuators**: Pneumatic artificial muscles (PAMs)
- **Tendon-driven systems**: Cables routed through pulleys
- **Elastic energy storage**: Springs in series with actuators

**Example**: MYOROBOTICS (tendon-driven humanoid)

### 6.3 AI-Driven Design

**Generative Design**:
- Use optimization algorithms to design robot structures
- Minimize weight while maintaining strength

**Reinforcement Learning for Control**:
- Learn locomotion policies directly from simulation
- Transfer to hardware via domain randomization

---

## 7. Lab Activity: Simulating a Humanoid Robot

### Objective
Load and control a humanoid robot in a physics simulator.

### Tools
- **Simulator**: MuJoCo (Multi-Joint dynamics with Contact)
- **Robot Model**: Unitree H1 (open-source URDF)

### Task
1. Load the H1 humanoid model
2. Apply joint torques to maintain balance
3. Implement a simple PD controller for standing

### Starter Code

```python
import mujoco
import mujoco.viewer
import numpy as np

# Load model
model = mujoco.MjModel.from_xml_path('unitree_h1/h1.xml')
data = mujoco.MjData(model)

# PD Controller gains
kp = 100.0  # Proportional gain
kd = 10.0   # Derivative gain

# Desired joint positions (standing pose)
q_desired = np.array([0.0] * model.nv)  # All joints at zero

def pd_control(q, qd, q_desired):
    """Simple PD controller for joint positions."""
    error = q_desired - q
    torque = kp * error - kd * qd
    return torque

# Simulation loop
with mujoco.viewer.launch_passive(model, data) as viewer:
    while viewer.is_running():
        # Get current state
        q = data.qpos[7:]  # Skip floating base (first 7 DOF)
        qd = data.qvel[6:]  # Skip floating base velocities
        
        # Compute control
        tau = pd_control(q, qd, q_desired)
        data.ctrl[:] = tau
        
        # Step simulation
        mujoco.mj_step(model, data)
        viewer.sync()
```

**Exercise**:
1. Tune `kp` and `kd` for stable standing
2. Add a sinusoidal reference to make the robot squat
3. Implement gravity compensation

---

## 8. Summary

**Key Takeaways**:
- ✅ Humanoid robots have 30-60 DOF, requiring sophisticated actuation and control
- ✅ Electric motors (especially QDD) are becoming the standard for modern humanoids
- ✅ Layered control architectures separate high-level planning from low-level execution
- ✅ ROS 2 provides a robust middleware for complex robotic systems
- ✅ Boston Dynamics Atlas demonstrates state-of-the-art dynamic locomotion

---

## 9. Review Questions

1. **Conceptual**: Why is the humanoid form advantageous for general-purpose robots? What are the main trade-offs?

2. **Technical**: Compare harmonic drives and direct-drive transmissions. When would you choose each?

3. **Applied**: A humanoid robot needs to walk on uneven terrain. Which sensors would you prioritize and why?

4. **Design**: You have a power budget of 500W. Allocate power to locomotion, manipulation, and computation. Justify your choices.

5. **Critical Thinking**: Tesla Optimus uses electric actuators while Boston Dynamics Atlas (original) used hydraulics. Analyze the implications for performance, cost, and maintenance.

---

## Glossary

- **Degree of Freedom (DOF)**: Independent motion capability of a joint
- **Quasi-Direct Drive (QDD)**: Low gear ratio actuation for high backdrivability
- **Harmonic Drive**: Gear reducer using flex spline deformation
- **Proprioception**: Sensing internal state (joint angles, forces)
- **Exteroception**: Sensing external environment (vision, LiDAR)
- **Model Predictive Control (MPC)**: Optimization-based control using predictive models

---

## References

1. Pratt, J., et al. (2012). "Capturability-based analysis and control of legged locomotion." *IJRR*, 31(9), 1094-1113.
2. Raibert, M., et al. (2008). "BigDog, the Rough-Terrain Quadruped Robot." *IFAC*, 41(2), 10822-10825.
3. Kuindersma, S., et al. (2016). "Optimization-based locomotion planning for the Atlas humanoid robot." *Autonomous Robots*, 40(3), 429-455.
4. Sentis, L. (2007). "Synthesis and control of whole-body behaviors in humanoid systems." PhD Thesis, Stanford University.

---

**Next Chapter**: [Chapter 3: Embodiment & Cognitive Models](/docs/module-01/chapter-03) — Explore how physical form shapes intelligence and behavior.
