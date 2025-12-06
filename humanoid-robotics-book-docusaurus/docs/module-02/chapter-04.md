# Chapter 4: Control Systems for Humanoid Robots

## Introduction

Control systems are the bridge between high-level planning and low-level actuation. This chapter covers the fundamental control techniques used in humanoid robotics, from classical PID control to advanced Model Predictive Control (MPC).

---

## 1. Foundations of Control Theory

### 1.1 Feedback Control Basics
- Open-loop vs. closed-loop systems
- Transfer functions and stability analysis
- Laplace transforms for continuous systems

### 1.2 PID Control
**Proportional-Integral-Derivative** control:

$$u(t) = K_p e(t) + K_i \int_0^t e(\tau) d\tau + K_d \frac{de(t)}{dt}$$

**Applications**:
- Joint position control
- Velocity regulation
- Force control

**Tuning Methods**:
- Ziegler-Nichols
- Cohen-Coon
- Auto-tuning algorithms

---

## 2. State-Space Control

### 2.1 State-Space Representation
$$\dot{x} = Ax + Bu$$
$$y = Cx + Du$$

### 2.2 Linear Quadratic Regulator (LQR)
Minimize cost function:
$$J = \int_0^\infty (x^T Q x + u^T R u) dt$$

**Example**: Balancing an inverted pendulum (humanoid torso)

### 2.3 Kalman Filtering
Optimal state estimation under Gaussian noise

---

## 3. Model Predictive Control (MPC)

### 3.1 Formulation
Solve optimization problem at each time step:
$$\min_{u_0, \ldots, u_{N-1}} \sum_{k=0}^{N-1} ||x_k - x_{ref}||^2 + ||u_k||^2$$

Subject to:
- Dynamics constraints
- Input limits
- Safety constraints

### 3.2 Applications in Humanoid Robotics
- **Locomotion**: Footstep planning (Atlas, Digit)
- **Manipulation**: Trajectory optimization
- **Whole-body control**: Coordinate all DOF

**Case Study**: Boston Dynamics Atlas uses MPC for dynamic walking

---

## 4. Adaptive and Robust Control

### 4.1 Adaptive Control
Learn model parameters online to handle uncertainty

### 4.2 Sliding Mode Control
Robust to disturbances and model errors

---

## 5. Lab Activity: Implementing PID Control

### Objective
Control a simulated robot arm to track a desired trajectory.

### Code Example
```python
class PIDController:
    def __init__(self, kp, ki, kd):
        self.kp, self.ki, self.kd = kp, ki, kd
        self.integral = 0
        self.prev_error = 0
    
    def update(self, error, dt):
        self.integral += error * dt
        derivative = (error - self.prev_error) / dt
        output = self.kp * error + self.ki * self.integral + self.kd * derivative
        self.prev_error = error
        return output
```

**Exercise**: Tune gains for minimal overshoot and settling time

---

## Summary
- ✅ PID control for basic regulation tasks
- ✅ State-space methods for optimal control
- ✅ MPC for constrained optimization
- ✅ Adaptive control for uncertain systems

---

## Review Questions
1. Derive the transfer function for a PID controller
2. Compare LQR and MPC for humanoid locomotion
3. Implement Kalman filter for IMU data fusion

---

## References
1. Åström, K. J., & Murray, R. M. (2021). *Feedback Systems*. Princeton University Press.
2. Kuindersma, S., et al. (2016). "Optimization-based locomotion planning for Atlas." *Autonomous Robots*.

---

**Next**: [Chapter 5: Computer Vision for Robotics](/docs/module-02/chapter-05)
