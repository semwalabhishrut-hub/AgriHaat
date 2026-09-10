#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>

int main() {
    pid_t pid;

    printf("[Parent] Initializing process (PID: %d)\n", getpid());

    pid = fork();

    if (pid < 0) {
        perror("Fork failed");
        exit(EXIT_FAILURE);
    } 
    else if (pid == 0) {
        printf("[Child] Spawned successfully (PID: %d, Parent PID: %d)\n", getpid(), getppid());
        
        char *args[] = {"/bin/ls", "-l", "/usr", NULL};
        char *env[] = {NULL};

        printf("[Child] Overwriting process space with /bin/ls using execve()...\n");
        
        if (execve(args[0], args, env) == -1) {
            perror("Execve failed");
            exit(EXIT_FAILURE);
        }
        
    } 
    else {
        int status;
        printf("[Parent] Waiting for child (PID: %d) to complete...\n", pid);

        pid_t terminated_pid = wait(&status);

        if (WIFEXITED(status)) {
            printf("[Parent] Child (PID: %d) exited with status code: %d\n", 
                    terminated_pid, WEXITSTATUS(status));
        }
    }

    return 0;
}