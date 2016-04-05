#include <sys/types.h>
#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>

int main() {
	pid_t pid; //Process ID
	pid_t sid; //Session ID
	char* strBuffer = (char*) malloc(sizeof(char) * 100);

	pid = fork(); //Returns 0 if child, or child's pid if parent
	if(pid < 0) {
		printf("forking failed\n");
		exit(EXIT_FAILURE);
	} else if(pid > 0) {
		printf("Child PID = %d\n", pid);
		exit(EXIT_SUCCESS); //We exit if we are the parent
	}

	//Has to do with file permissions, not enttirely sure what for
	umask(0);

    /* Create a new Session ID for the child process */
	// Not entirely sure what this does either
    sid = setsid();
    if (sid < 0) {
    	printf("Error setting child session ID\n");
		exit(EXIT_FAILURE);
    }

	/* Change the current working directory */
	// Leave for example

	// if ((chdir("/")) < 0) {
	// 	printf("Error changing child directory\n");
	// 	exit(EXIT_FAILURE);
	// }

	// getcwd(strBuffer, 100);
	// printf("cwd: %s", strBuffer);

	/* Close out the standard file descriptors */
	close(STDIN_FILENO);
	// close(STDOUT_FILENO);
	close(STDERR_FILENO);

	/* Daemon-specific initialization goes here */

	/* The Big Loop */
	printf("Daemon running\n");
	while (1) {
		pid = fork();
		if(pid == 0) //The child will then have its image replaced by the execl
			execl("testPrint.out", NULL);
		sleep(10); /* wait 30 seconds */
	}
   exit(EXIT_SUCCESS);


}