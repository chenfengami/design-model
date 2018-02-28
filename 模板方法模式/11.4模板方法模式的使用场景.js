/**
 * 从大的方面来讲，模板方法模式常被架构师用于搭建项目的框架，架构师订好了框架的骨架，程序员继承框架的结构之后，负责往里面填空。
 * 比如Java程序员大多使用过HttpServlet技术来开发项目。
 * 一个基于HttpServlet的程序包含7个生命周期，这7个生命周期分别对应一个do方法。
 */

    doGet();
    doHead();
    doPost();
    doPut();
    doDelete();
    doOption();
    doTrace();
//HttpServlet类还提供了一个service方法，它就是这里的模板方法，service规定了这些do方法的执行顺序，而这些do方法的具体实现则需要HttpServlet的子类来提供。