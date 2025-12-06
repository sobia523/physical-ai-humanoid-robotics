# Chapter 10: Sensor Systems & Perception

## Introduction

Robust perception requires fusing data from multiple sensors. This chapter covers sensor integration, calibration, and fusion techniques for humanoid robots.

---

## 1. Sensor Suite Overview

### 1.1 Proprioceptive Sensors
- **Joint encoders**: Position, velocity
- **Force/torque sensors**: Interaction forces
- **IMU**: Orientation, acceleration

### 1.2 Exteroceptive Sensors
- **Cameras**: RGB, depth, event
- **LiDAR**: 3D point clouds
- **Tactile**: Contact detection

---

## 2. Sensor Calibration

### 2.1 Camera Calibration
- Intrinsic parameters (focal length, principal point)
- Distortion coefficients (radial, tangential)
- Zhang's method using checkerboard

### 2.2 Camera-IMU Calibration
- Temporal synchronization
- Spatial transformation (extrinsics)
- Kalibr toolbox

### 2.3 LiDAR-Camera Calibration
- Correspondence-based methods
- Mutual information
- Deep learning approaches

---

## 3. Sensor Fusion

### 3.1 Extended Kalman Filter (EKF)
Fuse IMU + camera for pose estimation:

**Prediction**:
$$\hat{x}_{k|k-1} = f(\hat{x}_{k-1|k-1}, u_k)$$

**Update**:
$$\hat{x}_{k|k} = \hat{x}_{k|k-1} + K_k (z_k - h(\hat{x}_{k|k-1}))$$

### 3.2 Particle Filters
- Non-parametric Bayes filter
- Handle multi-modal distributions
- Applications: Localization in ambiguous environments

### 3.3 Factor Graphs
- SLAM formulation
- Optimize over entire trajectory
- Libraries: GTSAM, g2o

**Code**:
```python
import gtsam

# Create factor graph
graph = gtsam.NonlinearFactorGraph()

# Add odometry factors
for i in range(len(poses)-1):
    graph.add(gtsam.BetweenFactorPose3(i, i+1, odometry[i], noise))

# Add landmark observations
for obs in observations:
    graph.add(gtsam.GenericProjectionFactorCal3_S2(obs.point, noise, obs.pose_id, obs.landmark_id, K))

# Optimize
optimizer = gtsam.LevenbergMarquardtOptimizer(graph, initial_estimate)
result = optimizer.optimize()
```

---

## 4. Multi-Modal Perception

### 4.1 Vision-LiDAR Fusion
- Early fusion: Concatenate features
- Late fusion: Combine predictions
- Applications: Autonomous driving, outdoor navigation

### 4.2 Tactile-Vision Fusion
- Visual prediction + tactile confirmation
- Applications: Delicate manipulation

---

## 5. Case Studies

### 5.1 ANYmal Quadruped
- Fuses RGB-D cameras, LiDAR, IMU
- Robust outdoor navigation
- EKF-based state estimation

### 5.2 Tesla Autopilot
- Vision-only (8 cameras)
- Occupancy networks for 3D scene
- No LiDAR or radar

---

## 6. Lab Activity: IMU-Camera Fusion

### Objective
Implement EKF to fuse IMU and camera data.

**Code**:
```python
class EKF:
    def __init__(self, x0, P0):
        self.x = x0  # State: [pos, vel, orientation]
        self.P = P0  # Covariance
    
    def predict(self, u, dt, Q):
        # IMU-based prediction
        self.x = self.motion_model(self.x, u, dt)
        F = self.jacobian_F(self.x, u, dt)
        self.P = F @ self.P @ F.T + Q
    
    def update(self, z, R):
        # Camera-based update
        H = self.jacobian_H(self.x)
        y = z - self.measurement_model(self.x)
        S = H @ self.P @ H.T + R
        K = self.P @ H.T @ np.linalg.inv(S)
        self.x = self.x + K @ y
        self.P = (np.eye(len(self.x)) - K @ H) @ self.P
```

---

## Summary
- ✅ Multi-sensor calibration techniques
- ✅ Sensor fusion with EKF, particle filters, factor graphs
- ✅ Multi-modal perception strategies
- ✅ Real-world systems (ANYmal, Tesla)

---

## Review Questions
1. Derive the EKF update equations
2. Compare early vs. late fusion for vision-LiDAR
3. Implement particle filter for robot localization

---

## References
1. Thrun, S., et al. (2005). *Probabilistic Robotics*. MIT Press.
2. Dellaert, F., & Kaess, M. (2017). "Factor graphs for robot perception." *Foundations and Trends in Robotics*.

---

**Next**: [Chapter 11: Real-Time Systems & Edge AI](/docs/module-04/chapter-11)
