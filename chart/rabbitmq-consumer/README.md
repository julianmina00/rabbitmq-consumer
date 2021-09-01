# This project aims to test RabbitMQ by consuming messages Chart

This chart is aimed to deploy rabbitmq-consumer.

## First steps
Before installing the Chart, it is necessary to setup you environment by following the next steps:
1. Clone this repository
    ```
    git clone git@github.com:julianmina00/rabbitmq-consumer.git
    ```
2. Open the chart folder
    ```
    cd rabbitmq-consumer/chart
    ```

Now, you may proceed with the installation.

## Installation

To install the chart, execute:

```
helm install rabbitmq-consumer rabbitmq-consumer -f values.yaml
```

or

```
helm upgrade rabbitmq-consumer rabbitmq-consumer --install -f values.yaml
```
In these cases, `rabbitmq-consumer` is the name given to the deployment, the same of the chart. Notice that, it may be necessary to provide the [required parameters](#required-parameters) to get the deployment installed. These values may be set via file using `-f` option (as shown in the previous examples) or as parameters using `--set` option.

## Uninstalling the Chart

To uninstall the chart, execute:
```
helm uninstall rabbitmq-consumer
```
In this case, `rabbitmq-consumer` is the name given to the deployment.

## Parameters
The following table lists the configurable parameters of this chart:

| Parameter | Description | Default |
| --- | --- | --- |
| `container.image.registry` | Container image registry | `armdocker.rnd.ericsson.se/proj-connx` |
| `container.image.repository` | Container image repository name | `rabbitmq-consumer` |
| `container.image.tag` | Container image tag | `latest` |
| `container.image.pullPolicy` | Image pull policy | `Always` |
| `container.image.pullSecrets` | Specify docker-registry secret names as a string | `deployment-docker-registry-secret` |
| `container.resources.limits.memory` | Limit memory resources assigned to the container | `128Mi` |
| `container.resources.limits.cpu` | Limit CPU resources assigned to the container | `100m` |
| `container.resources.requests.memory` | Requested memory resources assigned to the container | `128Mi` |
| `container.resources.requests.cpu` | Requested CPU resources assigned to the container | `50m` |
| `container.additionalVariables` | Additional environment variables to be set | `LOGGER_LEVEL=info, ENV=production` |
| `deployment.name` | Name of the deployment | `rabbitmq-consumer` |
| `deployment.replicas` | Number of replicas to deploy initially | `1` |
| `deployment.minAvailable` | Minumun number of available replicas for the pod disruption budget | `1` |
| `deployment.servicePort.number` | Port to access the service | `3031` |
| `deployment.servicePort.name` | name givent to the service port | `http` |
| `deployment.containerPort.number` | Port exposed by the container | `3031` |
| `deployment.containerPort.protocol` | Protocol of the container port | `TCP` |
| `deployment.readinessProbe.endpoint` | Endpoint to be checked by the readiness probe | `/api/health` |
| `deployment.readinessProbe.successThreshold` | Successfull threshold for the readiness probe | `1` |
| `deployment.readinessProbe.failureThreshold` | Failure threshold for the readiness probe | `120` |
| `deployment.readinessProbe.periodSeconds` | Execution period of the readiness probe in seconds | `5` |
| `deployment.livenessProbe.endpoint` | Endpoint to be checked by the liveness probe | `/api/health` |
| `deployment.livenessProbe.successThreshold` | Successfull threshold for the liveness probe | `1` |
| `deployment.livenessProbe.failureThreshold` | Failure threshold for the liveness probe | `2` |
| `deployment.livenessProbe.periodSeconds` | Execution period of the liveness probe in seconds | `30` |
| `deployment.affinity` | Affinity for pod assignment. [See documentation](https://kubernetes.io/docs/concepts/configuration/assign-pod-node/#affinity-and-anti-affinity) | Anti-affinity Expression: `matchExpressions: app In values(rabbitmq-consumer)` |

The values file may be found [here](./values.yaml)

## Required Parameters
These are the required parameters:
- container.image.registry
- container.image.pullSecrets