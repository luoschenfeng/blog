# 常用命令行

- 删除所有镜像

```shell
docker image rm  $(docker container ls -q) -f
```

- 暂停所有镜像

```shell
docker container stop  $(docker container ls -aq)
```

-a 返回缓存中所有的镜像， -q 表示只返回次镜像的 id。

- 删除镜像

```shell
docker container rm  $(docker container ls -aq)
```

rm 指令加 -f 可直接删除所有的容器（无论是运行还是已经停止)